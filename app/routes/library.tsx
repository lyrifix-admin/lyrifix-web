import { Music, PlusIcon } from "lucide-react";
import { href, Link, redirect } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { createAuthFetch } from "~/lib/fetch";
import type { paths } from "~/schema";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/library";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Library Lyrifix" }];
}

type SuccessResponse =
  paths["/library"]["get"]["responses"][200]["content"]["application/json"];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!session.has("token") || !token) return redirect("/login");

  const $fetch = createAuthFetch(token);
  const { data: library, error } = await $fetch<SuccessResponse>("/library");

  if (error) {
    session.flash("error", "Failed to load your library");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return { library };
}

export default function LibraryRoute({ loaderData }: Route.ComponentProps) {
  const { library } = loaderData;

  return (
    <div className="space-y-6 text-white">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Library</h1>
          <p className="text-lg text-gray-300">
            Welcome back, {library.user.fullName}!
          </p>
          <p className="text-sm text-gray-400">
            {library.songs.length}{" "}
            {library.songs.length === 1 ? "song" : "songs"} in your collection
          </p>
        </div>
      </div>

      {/* Library Grid */}
      {library.songs.length === 0 ? (
        <div className="py-12 text-center">
          <Music className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-300">
            Your library is empty
          </h3>
          <p className="mb-6 text-gray-400">
            Start building your collection by adding your first song
          </p>
          <Link to="/add-song">
            <Button className="bg-pink-600 hover:bg-pink-700">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Your First Song
            </Button>
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-6">
          {/* Add Song Card */}
          <li>
            <Link to="/add-song">
              <Card className="group h-full border-2 border-dashed border-pink-500/50 bg-gray-800/50 transition-all duration-200 hover:scale-105 hover:border-pink-500 hover:bg-gray-800">
                <CardContent className="flex h-32 flex-col items-center justify-center p-6">
                  <PlusIcon className="h-8 w-8 text-pink-400 transition-colors group-hover:text-pink-300" />
                  <span className="mt-2 text-sm font-medium text-pink-400 group-hover:text-pink-300">
                    Add New Song
                  </span>
                </CardContent>
              </Card>
            </Link>
          </li>

          {/* Song Cards */}
          {library.songs.map((song) => (
            <li key={song.id}>
              <Link to={href("/songs/:slug", { slug: song.slug })}>
                <Card className="group h-full border border-pink-500/30 bg-gray-800/30 transition-all duration-200 hover:scale-105 hover:border-pink-500 hover:bg-gray-800/50">
                  <CardContent className="flex h-32 flex-col justify-between p-4">
                    <div>
                      <h2 className="line-clamp-2 text-sm font-semibold transition-colors group-hover:text-pink-300">
                        {song.title}
                      </h2>

                      {song.artists && song.artists.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {song.artists.slice(0, 2).map((artist, index) => (
                            <span
                              key={artist.id}
                              className="text-xs text-gray-400 group-hover:text-gray-300"
                            >
                              {artist.name}
                              {index <
                                Math.min(song.artists?.length || 0, 2) - 1 &&
                                ", "}
                            </span>
                          ))}
                          {song.artists.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{song.artists.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 border-t border-gray-700 pt-2">
                      <Music className="h-4 w-4 text-pink-400 opacity-60" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
