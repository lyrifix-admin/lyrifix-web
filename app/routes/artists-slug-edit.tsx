import type { paths } from "~/schema";
import type { Route } from "./+types/artists-slug-edit";
import { $fetch, createAuthFetch } from "~/lib/fetch";
import { Form, href, redirect, useNavigation } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { UpdateArtistSchema } from "~/schemas/artist";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SingleFileUploader } from "~/components/single-uploadcare";
import { Button } from "~/components/ui/button";
import { getSession } from "~/sessions.server";

type ArtistSuccessResponse =
  paths["/artists/{slug}"]["get"]["responses"][200]["content"]["application/json"];
type ActionSuccessResponse =
  paths["/artists/{id}"]["patch"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix - Edit Artist" },
    {
      name: "description",
      content: "Edit Artist",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const artistResponse = await $fetch<ArtistSuccessResponse>("/artists/:slug", {
    params: { slug },
  });

  if (artistResponse.error)
    throw new Response("Artist not found", { status: 404 });

  return {
    artist: artistResponse.data,
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? "",
  };
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: UpdateArtistSchema });

  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user?.id;
  if (!token || !userId) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const payload = { ...submission.value, userId };

  const { data, error } = await $fetch<ActionSuccessResponse>(
    `/artists/${submission.value.id}`,
    {
      method: "PATCH",
      body: payload,
    },
  );

  if (!data || error) {
    return submission.reply({
      fieldErrors: { name: ["Failed to update artist."] },
    });
  }

  return redirect(href("/artists/:slug", { slug: data.slug }));
}

export default function ArtistsSlugEditRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { artist, uploadcarePublicKey } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateArtistSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: artist.id,
      name: artist.name,
      imageUrl: artist.imageUrl,
    },
  });

  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Edit Artist</CardTitle>
        </CardHeader>

        <CardContent>
          <Form
            method="post"
            {...getFormProps(form)}
            className="mr-4 ml-4 space-y-4"
          >
            <input {...getInputProps(fields.id, { type: "hidden" })} />

            <div className="flex flex-col gap-1">
              <Label htmlFor={fields.name.id}>Artist Name</Label>
              <Input
                {...getInputProps(fields.name, { type: "text" })}
                placeholder="Artist Name"
                className="border-zinc-700 bg-zinc-800"
              />
              <p className="text-sm text-red-500">{fields.name.errors}</p>
            </div>

            <div>
              <label
                className="flex cursor-pointer flex-col items-center"
                htmlFor={fields.imageUrl.id}
              >
                <SingleFileUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  publicKey={uploadcarePublicKey}
                />

                <input
                  {...getInputProps(fields.imageUrl, { type: "text" })}
                  value={imageUrl}
                  readOnly
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving Artist..." : "Save Artist"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
