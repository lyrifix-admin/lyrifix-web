import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Form, href, redirect } from "react-router";

import MultiselectArtists from "~/components/multiselect-artists";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Option } from "~/components/ui/multiselect";
import type { paths } from "~/schema";
import type { Artist } from "~/schemas/artist";
import { CreateSongSchema } from "~/schemas/song";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/add-song";
import { apiWithToken } from "~/utils/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add New Song to Lyrifix" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  try {
    const artistsResponse = await apiWithToken<Artist[]>("/artists", { token });
    return { artistsResponse };
  } catch (error) {
    console.error(error);
    throw new Response("Song not found", { status: 404 });
  }
}

export type ActionSuccessResponse =
  paths["/songs"]["post"]["responses"][200]["content"]["application/json"];

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: CreateSongSchema });

  // console.log(submission);

  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  try {
    const response = await apiWithToken<ActionSuccessResponse>("/songs", {
      method: "POST",
      token,
      body: submission.value,
    });
    return redirect(href("/songs/:slug", { slug: response.slug }));
  } catch (error) {
    return submission.reply();
  }
}

export default function AddSongRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { artistsResponse } = loaderData;

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateSongSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      imageUrl: "https://placehold.co/500x500/EEE/31343C",
      title: "",
      artistIds: [], // ["abc", "def"],
    },
  });

  const artistIdsFieldList = fields.artistIds.getFieldList();

  const defaultOptions: Option[] = artistsResponse.map((artist) => ({
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
              {/* TODO: Use an Uploader component
              there's an uploadedImage object, but not yet the imageUrl
              imageUrl will be in another separated input
              */}

              <input
                {...getInputProps(fields.imageUrl, { type: "text" })}
                className="hidden"
              />
              <div className="flex h-16 w-16 items-center justify-center">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm text-zinc-400">Upload Photo</p>
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
