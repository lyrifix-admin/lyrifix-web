import type { paths } from "~/schema";
import type { Route } from "./+types/songs-slug-edit-lyric";
import { createAuthFetch } from "~/lib/fetch";
import { Form, Link, redirect, useNavigation } from "react-router";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { UpdateLyricSchema } from "~/schemas/lyric";
import { Button } from "~/components/ui/button";
import { getSession } from "~/sessions.server";
import MinimalTiptapEditor from "~/components/minimal-tiptap-editor";
import { useState } from "react";

type SongWithLyricsResponse =
  paths["/songs/{slug}"]["get"]["responses"][200]["content"]["application/json"];

type ActionSuccessResponse =
  paths["/lyrics/{id}"]["patch"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix - Edit Lyric" },
    {
      name: "description",
      content: "Edit Lyric",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const { slug, id } = params;

  // console.log("Loader params:", { slug, id });

  try {
    const { data: songData } = await $fetch<SongWithLyricsResponse>(
      `/songs/${slug}`,
      {
        params: { slug },
      },
    );

    // console.log("Song data:", songData);
    // console.log("Song lyrics:", songData?.lyrics);

    if (!songData?.lyrics || songData.lyrics.length === 0) {
      throw new Response("No lyrics found for this song", { status: 404 });
    }

    const targetLyric = songData.lyrics.find((lyric) => lyric.id === id);
    // console.log("Target lyric found:", targetLyric);

    if (!targetLyric) {
      throw new Response("Lyric not found", { status: 404 });
    }

    return {
      lyric: targetLyric,
      slug,
    };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Lyric not found", { status: 404 });
  }
}

export async function action({ request, params }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: UpdateLyricSchema });

  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user?.id;
  if (!token || !userId) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const payload = { ...submission.value, userId };

  const { data, error } = await $fetch<ActionSuccessResponse>(
    `/lyrics/${submission.value.id}`,
    {
      method: "PATCH",
      body: payload,
    },
  );

  if (!data || error) {
    return submission.reply({
      fieldErrors: { name: ["Failed to update lyric."] },
    });
  }
  const { slug } = params;
  return redirect(`/songs/${slug}`);
}

export default function LyricsSlugEditRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const lyric = loaderData.lyric;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateLyricSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: lyric.id || "",
      text: lyric.text || "",
    },
  });

  const [editorText, setEditorText] = useState(lyric.text || "");

  return (
    <div className="flex w-full items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg pt-8 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-white">
          Edit Lyric
        </h1>
        <Form
          method="patch"
          {...getFormProps(form)}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={lyric.id || ""} />

          <label
            hidden
            htmlFor={fields.text.id}
            className="mb-1 block text-sm font-medium text-zinc-200"
          >
            Lyric Text
          </label>

          <div>
            <MinimalTiptapEditor
              id={fields.text.id}
              name={fields.text.name}
              content={editorText}
              onChange={(val) => {
                // console.log("MinimalTiptapEditor onChange:", val);
                setEditorText(val);
              }}
            />
          </div>

          {fields.text.errors && (
            <p className="mt-2 text-sm text-red-500">
              {fields.text.errors.join(", ")}
            </p>
          )}

          <div>
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving Lyric..." : "Save Lyric"}
            </Button>
          </div>
          <div>
            <Button className="w-full" variant="outline" asChild>
              <Link to={`/songs/${loaderData.slug}`}>Cancel</Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
