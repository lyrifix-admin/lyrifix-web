import { Link } from "react-router";
import { Banner } from "~/components/banner";
import { SongCard } from "~/components/song-card";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import type { Route } from "./+types/home";

type SuccessResponse =
  paths["/songs"]["get"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const { data: songs } = await $fetch<SuccessResponse>("/songs");
  return { songs };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { songs } = loaderData;

  if (!songs) return null;

  return (
    <>
      <Banner />

      <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="flex h-full flex-col transition-all duration-200 hover:scale-105"
          >
            <Link
              to={`/songs/${song.slug}`}
              className="flex h-full flex-1 flex-col"
            >
              <SongCard key={song.id} song={song} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
