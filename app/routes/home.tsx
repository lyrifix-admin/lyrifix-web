import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import type { Songs } from "~/modules/song/type";

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
