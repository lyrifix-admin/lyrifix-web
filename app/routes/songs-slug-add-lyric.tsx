import { getFormProps, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, href, redirect } from "react-router";

import MinimalTiptapEditor from "~/components/minimal-tiptap-editor";
import { Button } from "~/components/ui/button";
import { createAuthFetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { CreateLyricSchema } from "~/schemas/lyric";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/songs-slug-add-lyric";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Lyric to Song" }];
}

export type LoaderSuccessResponse =
  paths["/songs/:slug"]["get"]["responses"][200]["content"]["application/json"];

export type ActionSuccessResponse =
  paths["/lyrics"]["post"]["responses"][200]["content"]["application/json"];

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const slug = params.slug;

  const { data: songData, error } = await $fetch<{ id: string }>(
    `/songs/${slug}`,
  );

  if (!songData || error) {
    throw new Response("Song not found", { status: 404 });
  }

  return {
    songId: songData.id,
    slug,
  };
}

export async function action({ request, params }: Route.ClientActionArgs) {
  const formData = await request.formData();
  // console.log("Form data received:", Object.fromEntries(formData.entries()));

  const submission = parseWithZod(formData, { schema: CreateLyricSchema });

  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const slug = params.slug;
  const $fetch = createAuthFetch(token);

  // Ambil songId dari slug
  const { data: songData, error: songError } = await $fetch<{ id: string }>(
    `/songs/${slug}`,
  );
  if (songError || !songData) {
    console.error("Failed to fetch song:", songError);
    return submission.reply({
      fieldErrors: { text: ["Failed to fetch song."] },
    });
  }
  const songId = songData.id;
  // console.log("Song ID:", songId);

  const lyricPayload = {
    text: submission.value.text,
    songId,
  };
  // console.log("Lyric Payload:", lyricPayload);

  const { data: lyricData, error: lyricError } =
    await $fetch<ActionSuccessResponse>("/lyrics", {
      method: "POST",
      body: lyricPayload,
    });

  if (lyricError || !lyricData) {
    console.error("Failed to add lyric:", lyricError);
    return submission.reply({
      fieldErrors: { text: ["Failed to add lyric."] },
    });
  }
  return redirect(href("/songs/:slug", { slug }));
}

export default function SongsSlugAddLyric({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateLyricSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      text: "Type the lyric here...",
      songId: loaderData.songId,
      slug: loaderData.slug,
    },
  });
  const controlText = useInputControl(fields.text);

  return (
    <div className="flex w-full items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg pt-8 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-white">
          Add Lyric
        </h1>
        <Form
          method="post"
          {...getFormProps(form)}
          className="flex flex-col gap-4"
        >
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
              placeholder="Type the lyric here..."
              content={controlText.value || "Type the lyric here..."}
              onChange={(val) => {
                // console.log("Editor value changed:", val);
                controlText.change(val);
              }}
            />
          </div>
          <input
            type="hidden"
            name={fields.songId?.name || "songId"}
            value={loaderData.songId}
          />
          <input
            type="hidden"
            name={fields.slug?.name || "slug"}
            value={loaderData.slug}
          />

          {fields.text.errors && (
            <p className="mt-2 text-sm text-red-500">
              {fields.text.errors.join(", ")}
            </p>
          )}
          <Button className="mt-4 w-full" type="submit">
            Save Lyric
          </Button>
        </Form>
      </div>
    </div>
  );
}
