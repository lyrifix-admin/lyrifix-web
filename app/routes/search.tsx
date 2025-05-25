import type { Route } from "./+types/search";
import { SongCard } from "~/components/song-card";
import { href, Link, redirect } from "react-router";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";

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
  const { songs } = loaderData;

  if (songs.length <= 0) {
    return <div>No songs found</div>;
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4">
        {songs.map((song) => (
          <li key={song.id}>
            <Link to={href("/songs/:slug", { slug: song.slug })}>
              <SongCard song={song} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
