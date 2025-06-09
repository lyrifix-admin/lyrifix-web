import type { Route } from "./+types/add-artist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add New Artists - Lyrifix" },
    {
      name: "description",
      content: "Discover artists and their music on Lyrifix.",
    },
  ];
}

export default function AddArtistRoute() {
  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold"> Add New Artists</h1>
        </div>
      </div>
    </div>
  );
}
