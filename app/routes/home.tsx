import type { Route } from "./+types/home";
import type { Songs } from "~/modules/song/type";
import { Banner } from "~/components/banner";
import { SongCard } from "~/components/song-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/songs`);
  const songs: Songs = await response.json();
  return songs;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const songs = loaderData;

  return (
    <>
      <Banner />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </>
  );
}
