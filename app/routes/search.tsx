import type { Route } from "./+types/search";
import { SongCard } from "~/components/song-card";
import { href, Link, redirect } from "react-router";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

type SuccessResponse =
  paths["/search"]["get"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix | Search" },
    {
      name: "description",
      content: "Search for your favorite songs and artists on Lyrifix.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  if (!q) return redirect("/");

  const { data: result, error } = await $fetch<SuccessResponse>("/search", {
    query: { q },
  });

  if (error) return { songs: [], artists: [], lyrics: [] };

  return result;
}

export default function SearchRoute({ loaderData }: Route.ComponentProps) {
  const { songs, artists } = loaderData;

  const hasData = songs.length > 0 || artists.length > 0;

  if (!hasData) {
    return <div className="mt-8 text-center">No Data Found</div>;
  }

  return (
    <div className="space-y-8">
      {songs.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl font-bold">Songs</h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {songs.map((song) => (
              <li key={song.id}>
                <Link to={href("/songs/:slug", { slug: song.slug })}>
                  <SongCard song={song} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {artists.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl font-bold">Artists</h2>
          <ul className="lg:grid-cols- grid grid-cols-2 gap-4 md:grid-cols-2">
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
        </section>
      )}
    </div>
  );
}
