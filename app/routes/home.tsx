import type { Route } from "./+types/home";
import { Header } from "~/components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lyrifix" },
    { name: "description", content: "Fix the lyric, Feel the music." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <h1 className="text-2xl text-blue-950">Welcome to Lyrifix</h1>
      <p>Fix the lyric, Feel the music</p>
    </div>
  );
}
