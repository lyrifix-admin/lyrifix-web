import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus } from "lucide-react";
import { Form, href, redirect } from "react-router";
import MultiselectArtists from "~/components/multiselect-artists";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { paths } from "~/schema";
import type { Artist } from "~/schemas/artist";
import { CreateSongSchema } from "~/schemas/song";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/add-song";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/artists`);
    if (!response.ok) {
      throw new Error("Failed to fetch song data");
    }
    const artists: Artist[] = await response.json();
    return { artists };
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

  console.log(submission);

  if (submission.status !== "success") return submission.reply();

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  console.log(token);

  console.log(submission.value);

  return redirect(href("/add-song"));

  // const response = await fetch(`${process.env.BACKEND_API_URL}/songs`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(submission.value),
  // });
  // if (!response.ok) return submission.reply();

  // const song: SuccessResponse = await response.json();

  // return redirect(href("/songs/:slug", { slug: song.slug }));
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
  });

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Add Song</CardTitle>
        </CardHeader>

        <CardContent>
          <Form method="post" className="mr-4 ml-4" onSubmit={form.onSubmit}>
            <label
              className="mb-10 flex cursor-pointer flex-col items-center"
              htmlFor="photo"
            >
              <Input type="file" className="hidden" id="photo" />
              <div className="flex h-16 w-16 items-center justify-center">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm text-zinc-400">Upload Photo</p>
            </label>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Input
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={fields.title.initialValue}
                  id="title"
                  placeholder="Song Title"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">{fields.title.errors}</p>
              </div>

              <div className="flex flex-col gap-1">
                <MultiselectArtists
                  data={artists}
                  key={fields.artistIds.key}
                  name={fields.artistIds.name}
                  id="artist"
                  placeholder="Select Artists"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">
                  {fields.artistIds.errors}
                </p>
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
