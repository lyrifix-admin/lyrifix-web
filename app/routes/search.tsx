import type { Route } from "./+types/search";
import type { SearchResultsResponse } from "~/modules/song/type";
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
}: Route.LoaderArgs): Promise<SearchResultsResponse | Response> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  if (!q) {
    return redirect("/");
  }
  const response = await fetch(`${process.env.BACKEND_API_URL}/search?q=${q}`);
  const results: SearchResultsResponse = await response.json();
  return results;
}

export default function SearchRoute({
  loaderData,
}: {
  loaderData: SearchResultsResponse;
}) {
  const { songs } = loaderData;

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
