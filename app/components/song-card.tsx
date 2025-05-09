import type { Song } from "~/modules/song/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";

export function SongCard({ song }: { song: Song; className?: string }) {
  return (
    <Card
      key={song.id}
      className={
        "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center text-white shadow-lg"
      }
    >
      <img
        src={song.imageUrl}
        alt={song.title}
        className="aspect-square rounded-2xl object-cover"
      />

      <CardContent>
        <CardTitle>{song.title}</CardTitle>
        <CardDescription>
          {song.artists.map((artist) => artist.name).join(", ")}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
