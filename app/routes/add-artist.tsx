import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/add-artist";
import { Form, href, redirect, useNavigation } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { parseWithZod } from "@conform-to/zod";
import { CreateArtistSchema } from "~/schemas/artist";
import { useState } from "react";
import { SingleFileUploader } from "~/components/single-uploadcare";
import { getSession } from "~/sessions.server";
import { createAuthFetch } from "~/lib/fetch";
import type { paths } from "~/schema";

export type ActionSuccessResponse =
  paths["/artists"]["post"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add New Artists - Lyrifix" },
    {
      name: "description",
      content: "Discover artists and their music on Lyrifix.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return {
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? "",
  };
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: CreateArtistSchema });
  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user?.id;
  if (!token || !userId) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const payload = { ...submission.value, userId };

  const { data: artist, error } = await $fetch<ActionSuccessResponse>(
    "/artists",
    {
      method: "POST",
      body: payload,
    },
  );

  if (!artist || error) {
    return submission.reply({
      fieldErrors: { name: ["Failed to add artist."] },
    });
  }

  return redirect(href("/artists"));
}

export default function AddArtistRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { uploadcarePublicKey } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateArtistSchema });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      name: "",
      imageUrl: "",
    },
  });

  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">
            Add New Artist
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form
            method="post"
            {...getFormProps(form)}
            className="mr-4 ml-4 space-y-4"
          >
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
