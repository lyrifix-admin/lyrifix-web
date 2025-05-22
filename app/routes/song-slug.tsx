import { BACKEND_API_URL } from "~/env";
import type { Route } from "./+types/song-slug";
import type { Song } from "~/schemas/song";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { apiFetch } from "~/utils/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix - Lyric" },
    {
      name: "description",
      content: "Lyric page of Lyrifix",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  try {
    const song = await apiFetch<Song>(`/songs/${slug}`);
    return { song };
  } catch (error) {
    console.error(error);
    throw new Response("Song not found", { status: 404 });
  }
}

export default function SongSlug({ loaderData }: Route.ComponentProps) {
  const { song } = loaderData;

  return (
    <div className="my-8 flex flex-col items-center justify-center gap-2">
      <img
        src={song.imageUrl}
        alt={song.title}
        className="h-40 w-40 rounded-2xl object-cover"
      />
      <h2 className="text-center text-3xl font-bold text-white">
        {song.title}
      </h2>
      <p className="text-sm text-gray-400">
        {song.artists.map((artist) => artist.name).join(", ")}
      </p>
      <p className="mt-4 text-left text-lg whitespace-pre-line text-white">
        {song.lyrics.map((lyric) => (lyric.text ? lyric.text : "")).join("")}
      </p>

      <Button asChild>
        <Link to={`/songs/${song.slug}/add-lyric`}>Add Lyric</Link>
        {/* use href utility */}
      </Button>
    </div>
  );
}
