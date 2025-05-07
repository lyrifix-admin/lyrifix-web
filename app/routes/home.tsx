import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import type { SongsSchema } from "~/modules/song/schema";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    const baseUrl = String(process.env.BACKEND_API_URL);
    const response = await fetch(`${baseUrl}/songs`);
    const songs: typeof SongsSchema = await response.json();

    return songs;
  } catch (error) {
    return error;
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const songs = loaderData;

  console.log(songs, "ini cek undifined");

  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => {
          return (
            <Card key={song.id} className="shadow-lg">
              <CardContent>
                <CardTitle>{song.title}</CardTitle>
                <p>{song.artist}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
