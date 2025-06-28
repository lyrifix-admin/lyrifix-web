import { ScrollText, PlusIcon } from "lucide-react";
import { Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/library-lyric";
import { SongCard } from "~/components/song-card";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Library Lyrifix" }];
}

type SuccessResponse =
  paths["/library"]["get"]["responses"][200]["content"]["application/json"];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");

  if (!session.has("token") || !token || !user) return redirect("/login");

  const { data: library, error } = await $fetch<SuccessResponse>("/library", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (error) {
    session.flash("error", "Failed to load your library");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return { library, user };
}

export default function LibraryLyricRoute({
  loaderData,
}: Route.ComponentProps) {
  const { library, user } = loaderData;

  if (!library) return null;

  console.log(library.lyrics);
  const navLinks = [
    { to: "/library", text: "Songs" },
    { to: "/library-artist", text: "Artists" },
    { to: "/library-lyric", text: "Lyrics" },
  ];

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Lyrics Library</h1>
          <p className="text-lg text-gray-300">
            Welcome back, {library.user.fullName}!
          </p>
          <p className="text-sm text-gray-400">
            {library.lyrics.length}{" "}
            {library.lyrics.length === 1 ? "lyric" : "lyrics"} in your
            collection
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "default"}
                className={cn("text-sm", isActive && "bg-secondary text-white")}
                asChild
              >
                <span>{link.text}</span>
              </Button>
            )}
          </NavLink>
        ))}
      </div>

      {library.lyrics.length === 0 ? (
        <div className="py-12 text-center">
          <ScrollText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-300">
            Your lyric library is empty
          </h3>
          <p className="mb-6 text-gray-400">
            Start your collection by adding your first lyric
          </p>
          <div className="flex flex-col flex-wrap items-center gap-2">
            <Button asChild variant="secondary">
              <Link to="/">
                <PlusIcon className="mr-2 h-4 w-4" />
                <span>Explore Songs to Add Your First Lyric</span>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2">
          <li className="flex h-full flex-col">
            <Link to="/" className="flex h-full flex-1 flex-col">
              <div className="group flex h-full flex-col rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gray-800/50 p-6 transition-all duration-200 hover:scale-105 hover:border-fuchsia-500 hover:bg-gray-800">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <PlusIcon className="h-8 w-8 text-fuchsia-400 transition-colors group-hover:text-fuchsia-300" />
                  <span className="text-fuchisa-400 mt-2 text-sm font-medium group-hover:text-fuchsia-300">
                    Explore Songs to Lyric
                  </span>
                </div>
              </div>
            </Link>
          </li>

          {library.lyrics.map((lyric) => (
            <li
              key={lyric.id}
              className="flex h-full flex-col transition-all duration-200 hover:scale-105"
            >
              <Link
                to={`/songs/${lyric.song.slug}?lyric=${user.username}`}
                className="flex h-full flex-1 flex-col"
              >
                <SongCard song={lyric.song} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
