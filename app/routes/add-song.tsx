import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { Form } from "react-router";

export default function AddSong() {
  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Add Song</CardTitle>
        </CardHeader>

        <CardContent>
          <Form method="post" className="mr-4 ml-4">
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
              <Input
                placeholder="Title"
                className="border-zinc-700 bg-zinc-800"
              />

              <Input
                placeholder="Artist"
                className="border-zinc-700 bg-zinc-800"
              />

              <Input
                placeholder="Lyric"
                className="border-zinc-700 bg-zinc-800"
              />
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
