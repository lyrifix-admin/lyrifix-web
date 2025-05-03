import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Lyrifix</h1>
      <p>Fix the lyric, Feel the music</p>
    </div>
  );
}
