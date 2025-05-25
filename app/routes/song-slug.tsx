import type { Route } from "./+types/song-slug";
import { href, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";

type SuccessResponse =
  paths["/songs/:slug"]["get"]["responses"][200]["content"]["application/json"];

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

  const { data: song, error } = await $fetch<SuccessResponse>("/songs/:slug", {
    params: { slug },
  });
  if (error) throw new Response("Song not found", { status: 404 });
  return { song };
}

export default function SongSlug({ loaderData }: Route.ComponentProps) {
  const { song } = loaderData;

  return (
    <div className="my-8">
      <section className="flex flex-col items-center justify-center gap-2">
        <img
          src={song.imageUrl || "https://placehold.co/500x500/EEE/31343C"}
          alt={song.title}
          className="h-40 w-40 rounded-2xl object-cover"
        />
        <h2 className="text-center text-3xl font-bold text-white">
          {song.title}
        </h2>
        <p className="text-sm text-gray-400">
          {song.artists &&
            song.artists.length > 0 &&
            song.artists.map((artist) => artist.name).join(", ")}
        </p>
        <Button asChild size="sm">
          <Link to={href("/songs/:slug/add-lyric", { slug: song.slug })}>
            Add Lyric
          </Link>
        </Button>
      </section>

      <p className="mt-4 text-left text-lg whitespace-pre-line text-white">
        {song.lyrics && song.lyrics.length > 0 && song.lyrics[0]?.text}
      </p>
    </div>
  );
}
