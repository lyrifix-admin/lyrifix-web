import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import type { paths } from "~/schema";

type Song =
  paths["/songs"]["get"]["responses"][200]["content"]["application/json"][0];

export function SongCard({ song }: { song: Song; className?: string }) {
  return (
    <Card
      key={song.id}
      className={
        "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center text-white shadow-lg"
      }
    >
      <img
        src={song.imageUrl || "https://placehold.co/500x500/EEE/31343C"}
        alt={song.title}
        className="aspect-square rounded-2xl object-cover"
      />

      <CardContent>
        <CardTitle>{song.title}</CardTitle>
        <CardDescription>
          {song.artists && song.artists.length > 0 && (
            <span>{song.artists.map((artist) => artist.name).join(", ")}</span>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
