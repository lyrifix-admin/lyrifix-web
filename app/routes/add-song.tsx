import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/add-song";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CreateSongSchema } from "~/schemas/song";
import { getSession } from "~/sessions.server";

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: CreateSongSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const response = await fetch(`${process.env.BACKEND_API_URL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submission.value),
  });
  if (!response.ok) {
    console.error(await response.json());

    return null;
  }

  return redirect("/add-song");
}

export default function AddSong({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateSongSchema });
    },
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
                  placeholder="Title"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">{fields.title.errors}</p>
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  key={fields.artist.key}
                  name={fields.artist.name}
                  defaultValue={fields.artist.initialValue}
                  id="artist"
                  placeholder="Artist"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">{fields.artist.errors}</p>
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  key={fields.lyric.key}
                  name={fields.lyric.name}
                  defaultValue={fields.lyric.initialValue}
                  id="lyric"
                  placeholder="Lyric"
                  className="border-zinc-700 bg-zinc-800"
                />
                <p className="text-sm text-red-500">{fields.lyric.errors}</p>
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
