import type { Route } from "./+types/artist-slug";
import { getSession } from "~/sessions.server";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { href, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Debug } from "~/components/ui/debug";

type ArtistSuccessResponse =
  paths["/artists/{slug}"]["get"]["responses"][200]["content"]["application/json"];

export function meta({ data }: Route.MetaArgs) {
  const artist = data?.artist;
  if (!artist) return [{ title: `Artist not found - Lyrifix` }];
  return [{ title: `${artist.name} - Lyrifix` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  const user = session.get("user");

  const { data: artist, error } = await $fetch<ArtistSuccessResponse>(
    `/artists/${slug}`,
    {
      params: { slug },
    },
  );
  if (error) throw new Response("Artist not found", { status: 404 });

  return { artist, isAuthenticated };
}

export default function ArtistSlugRoute({ loaderData }: Route.ComponentProps) {
  const { artist, isAuthenticated } = loaderData;

  return (
    <div className="flex flex-col pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <img
          src={artist.imageUrl ?? "https://placehold.co/500x500/EEE/31343C"}
          alt={artist.name}
          className="h-40 w-40 rounded-xl object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
        </div>
        <div>
          {isAuthenticated && (
            <Button asChild size="sm">
              <Link to={href("/artists/:slug/edit", { slug: artist.slug })}>
                Edit Artist
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-8 py-4">
        <h2 className="mt-8 mb-4 text-2xl font-semibold">Songs</h2>
        <div className="space-y-4">
          {artist.songs?.map((song, i) => (
            <Link
              to={`/songs/${song.slug}`}
              key={song.id}
              className="hover:bg-card flex items-center space-x-4 rounded-md border-2 border-fuchsia-500 p-2 transition-all duration-200 hover:scale-105"
            >
              <img
                src={song.imageUrl ?? "https://placehold.co/500x500/EEE/31343C"}
                alt={song.title}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="leading-tight font-medium">{song.title}</span>
                <span className="text-muted-foreground text-sm">
                  {artist.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
