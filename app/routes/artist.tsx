import type { Route } from "./+types/artist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artists - Lyrifix" },
    {
      name: "description",
      content: "Discover artists and their music on Lyrifix.",
    },
  ];
}

export default function ArtistRoute() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Artists</h1>
    </div>
  );
}
