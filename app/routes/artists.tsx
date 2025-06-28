import type { Route } from "./+types/artists";
import { Link } from "react-router";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artists - Lyrifix" },
    {
      name: "description",
      content: "Discover artists and their music on Lyrifix.",
    },
  ];
}
type ArtistsSuccessResponse =
  paths["/artists"]["get"]["responses"][200]["content"]["application/json"];

export async function loader() {
  const { data: artists } = await $fetch<ArtistsSuccessResponse>("/artists");
  return { artists };
}

export default function ArtistRoute({ loaderData }: Route.ComponentProps) {
  const { artists } = loaderData;

  if (!artists) return null;

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artists</h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2">
        {artists.map((artists) => (
          <li
            key={artists.id}
            className="flex h-full flex-col transition-all duration-200 hover:scale-105"
          >
            <Link
              to={`/artists/${artists.slug}`}
              className="flex h-full flex-1 flex-col"
            >
              <Card
                key={artists.id}
                className={
                  "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center break-words text-white shadow-lg"
                }
              >
                <img
                  src={
                    artists.imageUrl ||
                    "https://placehold.co/500x500/EEE/31343C"
                  }
                  alt={artists.name}
                  className="aspect-square h-40 w-40 rounded-full bg-zinc-800 object-cover"
                />

                <CardContent>
                  <CardTitle className="w-full max-w-xs text-center break-words">
                    {artists.name}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
