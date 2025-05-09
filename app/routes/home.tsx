import type { Route } from "./+types/home";
import type { Songs } from "~/modules/song/type";
import { Banner } from "~/components/banner";
import { SongCard } from "~/components/song-card";
import { Link } from "react-router";
import { BACKEND_API_URL } from "~/env";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(`${BACKEND_API_URL}/songs`);
  const songs: Songs = await response.json();
  return songs;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const songs = loaderData;

  return (
    <>
      <Banner />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {songs.map((song) => (
          <li key={song.id}>
            <Link to={`/songs/${song.slug}`}>
              <SongCard key={song.id} song={song} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
