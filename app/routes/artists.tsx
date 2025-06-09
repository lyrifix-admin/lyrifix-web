import type { Route } from "./+types/artists";
import { Link } from "react-router";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { PaletteIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { getSession } from "~/sessions.server";

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

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  const user = session.get("user");

  const { data: artists } = await $fetch<ArtistsSuccessResponse>("/artists");
  return { artists, isAuthenticated, user };
}

export default function ArtistRoute({ loaderData }: Route.ComponentProps) {
  const { artists, isAuthenticated, user } = loaderData;

  if (!artists) return null;

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artists</h1>
        </div>
      </div>

      <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2">
        {isAuthenticated && user && (
          <li className="flex h-full flex-col">
            <Link to="/add-artist" className="flex h-full flex-1 flex-col">
              <div className="group flex h-full flex-col rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gray-800/50 p-6 transition-all duration-200 hover:scale-105 hover:border-fuchsia-500 hover:bg-gray-800">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <PlusIcon className="h-8 w-8 text-fuchsia-400 transition-colors group-hover:text-fuchsia-300" />
                  <span className="text-fuchisa-400 mt-2 text-sm font-medium group-hover:text-fuchsia-300">
                    Add New Artist
                  </span>
                </div>
              </div>
            </Link>
          </li>
        )}
        {artists.map((artists) => (
          <li
            key={artists.id}
            className="flex h-full flex-col transition-all duration-200 hover:scale-105"
          >
            <Link
              to={`/songs/${artists.slug}`}
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
