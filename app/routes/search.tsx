import type { Route } from "./+types/search";
import { SongCard } from "~/components/song-card";
import { Link, redirect } from "react-router";
import type { SearchResultsResponse } from "~/schemas/search";
import { apiFetch } from "~/utils/api";

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
  if (!q) {
    return redirect("/");
  }
  // const response = await apiFetch(
  //   `${process.env.BACKEND_API_URL}/search?q=${q}`,
  // );
  const results: SearchResultsResponse = await apiFetch(`/search?q=${q}`);
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
