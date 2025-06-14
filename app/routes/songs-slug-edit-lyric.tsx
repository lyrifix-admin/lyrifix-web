import type { paths } from "~/schema";
import type { Route } from "./+types/songs-slug-edit-lyric";
import { createAuthFetch } from "~/lib/fetch";
import { Form, href, redirect, useNavigation } from "react-router";
import { getFormProps, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { UpdateLyricSchema } from "~/schemas/lyric";
import { Button } from "~/components/ui/button";
import { getSession } from "~/sessions.server";
import MinimalTiptapEditor from "~/components/minimal-tiptap-editor";
import { Debug } from "~/components/ui/debug";
import { useState } from "react";

type SongWithLyricsResponse =
  paths["/songs/{slug}"]["get"]["responses"][200]["content"]["application/json"];
type LyricsSuccessResponse =
  paths["/lyrics/{slug}"]["get"]["responses"][200]["content"]["application/json"];

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
  const { slug } = params;

  const { data: songData } = await $fetch<SongWithLyricsResponse>(
    `/songs/${slug}`,
    {
      params: { slug },
    },
  );

  const lyricSlug = songData?.lyrics?.[0]?.slug;

  if (!lyricSlug) {
    throw new Response("Lyric not found", { status: 404 });
  }

  const lyric = await $fetch<LyricsSuccessResponse>(`/lyrics/${lyricSlug}`);

  if (lyric.error) throw new Response("Lyric not found", { status: 404 });

  return {
    lyric: lyric.data,
  };
}

export async function action({ request }: Route.ClientActionArgs) {
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

  return redirect("/");
}

export default function LyricsSlugEditRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const lyricData =
    (loaderData.lyric as { lyric?: any })?.lyric || loaderData.lyric;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  console.log("Full loaderData:", loaderData);
  console.log("lyricData:", lyricData);
  console.log("lyricData.text:", lyricData?.text);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateLyricSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: lyricData?.id || "",
      text: lyricData?.text || "",
    },
  });

  const [editorText, setEditorText] = useState(lyricData?.text || "");

  return (
    <div className="flex w-full items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg pt-8 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-white">
          Edit Lyric
        </h1>
        <Form
          method="post"
          {...getFormProps(form)}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={lyricData?.id || ""} />

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
                console.log("MinimalTiptapEditor onChange:", val);
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
        </Form>

        <Debug>{lyricData}</Debug>
      </div>
    </div>
  );
}
