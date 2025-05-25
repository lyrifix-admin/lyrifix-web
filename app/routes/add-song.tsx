import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { Form, href, redirect } from "react-router";

import { MultiselectArtists } from "~/components/multiselect-artists";
import { SingleFileUploader } from "~/components/single-uploadcare";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Option } from "~/components/ui/multiselect";
import { createAuthFetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { CreateSongSchema } from "~/schemas/song";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/add-song";

type LoaderSuccessResponse =
  paths["/artists"]["get"]["responses"][200]["content"]["application/json"];

export type ActionSuccessResponse =
  paths["/songs"]["post"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add New Song to Lyrifix" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const $fetch = createAuthFetch(token);

  const { data: artists, error } =
    await $fetch<LoaderSuccessResponse>("/artists");

  if (!artists || error) throw new Response("No artists data", { status: 500 });

  return { artists };
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: CreateSongSchema });
  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const $fetch = createAuthFetch(token);

  const { data: song, error } = await $fetch<ActionSuccessResponse>("/songs", {
    method: "POST",
    body: submission.value,
  });

  if (!song || error) {
    return submission.reply({
      fieldErrors: { email: ["Failed to add song."] },
    });
  }

  return redirect(href("/songs/:slug", { slug: song.slug }));
}

export default function AddSongRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { artists } = loaderData;

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateSongSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      imageUrl: "",
      title: "",
      artistIds: [], // ["abc", "def"],
    },
  });

  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");

  const artistIdsFieldList = fields.artistIds.getFieldList();

  const defaultOptions: Option[] = artists.map((artist) => ({
    value: artist.id,
    label: artist.name,
  }));

  const controlArtistIds = useInputControl(fields.artistIds); // Conform
  const [artistOptions, setArtistOptions] = useState<Option[]>([]); // Multiselect

  const handleChangeArtistOptions = (options: Option[]) => {
    setArtistOptions(options); // [{value: "abc", label: "Artist"}]
    const artistIds = options.map((option) => option.value); // ["abc", "def"]
    controlArtistIds.change(artistIds);
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Add Song</CardTitle>
        </CardHeader>

        <CardContent>
          <Form method="post" {...getFormProps(form)} className="mr-4 ml-4">
            <label
              className="mb-10 flex cursor-pointer flex-col items-center"
              htmlFor={fields.imageUrl.id}
            >
              <SingleFileUploader
                value={imageUrl}
                onChange={(url: string) => setImageUrl(url)}
              />

              <input
                {...getInputProps(fields.imageUrl, { type: "text" })}
                value={imageUrl}
                readOnly
                className="hidden"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-4 max-h-40 rounded shadow"
                />
              )}
            </label>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Label htmlFor={fields.title.id}>Song Title</Label>
                <Input
                  {...getInputProps(fields.title, { type: "text" })}
                  placeholder="Song Title"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">{fields.title.errors}</p>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor={fields.artistIds.id}>Select Artists</Label>

                <MultiselectArtists
                  defaultOptions={defaultOptions}
                  artistOptions={artistOptions}
                  handleChangeArtistOptions={handleChangeArtistOptions}
                  id="artist"
                  placeholder="Type artist name..."
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">
                  {fields.artistIds.errors}
                </p>

                <ul>
                  {artistIdsFieldList.map((artistId) => (
                    <li key={artistId.key}>
                      <input name={artistId.name} />
                      <div>{artistId.errors}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14">
              <Button className="w-full">Save</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
