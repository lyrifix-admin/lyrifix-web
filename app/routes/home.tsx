import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl text-blue-950">Welcome to Lyrifix</h1>
      <p>Fix the lyric, Feel the music</p>
    </div>
  );
}
