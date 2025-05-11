import type { Route } from "./+types/search";
import type { SongsResponse } from "~/modules/song/type";
import { SongCard } from "~/components/song-card";
import { Link, redirect } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix | Search" },
    {
      name: "description",
      content: "Search for your favorite songs and artists on Lyrifix.",
    },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<SongsResponse | Response> {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword")?.trim();
  if (!keyword) {
    return redirect("/");
  }
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/songs/search?keyword=${keyword}`,
  );
  const songs: SongsResponse = await response.json();
  return songs;
}

export default function SearchRoute({
  loaderData,
}: {
  loaderData: SongsResponse;
}) {
  const songs = loaderData.songs;
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4">
        {songs.map((song) => (
          <li key={song.id}>
            <Link to={`/songs/${song.slug}`}>
              <SongCard song={song} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
