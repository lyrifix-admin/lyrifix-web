import type { Song } from "~/modules/song/type";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function SongCard({ song }: { song: Song }) {
  return (
    <Card className="bg-card flex flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center text-white shadow-lg">
      <img
        src={song.imageUrl}
        alt={song.title}
        className="mb-4 h-40 w-40 rounded-2xl object-cover"
      />
      <CardContent>
        <CardTitle className="font-semibold">{song.title}</CardTitle>
        <p className="text-sm text-gray-400">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </CardContent>
    </Card>
  );
}
