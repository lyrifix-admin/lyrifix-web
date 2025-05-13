import type { Route } from "./+types/artist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artist - Lyrifix" },
    {
      name: "description",
      content: "Artist page of Lyrifix. Fix the lyric, Feel the music.",
    },
  ];
}

export default function ArtistRoute() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Artist</h1>
    </div>
  );
}
