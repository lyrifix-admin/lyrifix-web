import { href, Link, useNavigate } from "react-router";

import { Button } from "~/components/ui/button";
import { $fetch } from "~/lib/fetch";
import { parseHTML } from "~/lib/html";
import type { paths } from "~/schema";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/song-slug";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

type SuccessResponse =
  paths["/songs/{slug}"]["get"]["responses"][200]["content"]["application/json"];

export function meta({ data }: Route.MetaArgs) {
  const song = data?.song;
  if (!song) return [{ title: `Song not found - Lyrifix` }];
  return [{ title: `${song.title} - Lyrifix` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  const user = session.get("user");

  const { data: song, error } = await $fetch<SuccessResponse>("/songs/:slug", {
    params: { slug },
  });
  if (error) throw new Response("Song not found", { status: 404 });

  const url = new URL(request.url);
  const lyricSearchParam = url.searchParams.get("lyric");

  return { isAuthenticated, user, song, lyricSearchParam };
}

export default function SongSlug({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const { isAuthenticated, user, song, lyricSearchParam } = loaderData;

  const lyricsByUser: Record<string, typeof song.lyrics> = {};

  for (const lyric of song.lyrics ?? []) {
    const key = lyric.userId ?? "_unknown";
    if (!lyricsByUser[key]) {
      lyricsByUser[key] = [];
    }
    lyricsByUser[key].push(lyric);
  }

  const isSongOwner = song.userId === user?.id;

  const firstUsername = Array.isArray(song.lyrics)
    ? song.lyrics[0]?.user.username
    : "";

  const selectedLyricTab = lyricSearchParam ? lyricSearchParam : firstUsername;

  function handleLyricTabChange(value: string) {
    navigate(`/songs/${song.slug}?lyric=${value}`);
  }

  return (
    <div className="my-8 overflow-x-hidden">
      <section className="flex flex-col items-center justify-center gap-2">
        <img
          src={song.imageUrl || "https://placehold.co/500x500/EEE/31343C"}
          alt={song.title}
          className="h-40 w-40 rounded-2xl object-cover"
        />
        <h2 className="text-center text-3xl font-bold text-white">
          {song.title}
        </h2>
        <p className="text-sm text-gray-400">
          {song.artists &&
            song.artists.length > 0 &&
            song.artists.map((artist) => artist.name).join(", ")}
        </p>

        <div className="flex gap-2">
          {isAuthenticated && isSongOwner && (
            <Button asChild size="sm">
              <Link to={href("/songs/:slug/edit", { slug: song.slug })}>
                Edit Song
              </Link>
            </Button>
          )}

          <Button asChild size="sm">
            <Link to={href("/songs/:slug/add-lyric", { slug: song.slug })}>
              Add Lyric
            </Link>
          </Button>
        </div>
      </section>

      {Array.isArray(song.lyrics) && (
        <Tabs
          defaultValue={selectedLyricTab}
          onValueChange={handleLyricTabChange}
          className="mt-4 w-full"
        >
          <TabsList className="scrollbar-thin flex max-w-full overflow-x-auto whitespace-nowrap">
            {song.lyrics?.map((lyric) => {
              return (
                <TabsTrigger key={lyric.id} value={lyric.user.username}>
                  {lyric.user.username}
                </TabsTrigger>
              );
            })}

            {/* {Object.entries(lyricsByUser).map(([userId], index) => (
            <TabsTrigger key={userId} value={userId}>
              {userId === "_unknown"
                ? "Unknown"
                : `User ${index + 1} - ${userId}`}
            </TabsTrigger>
          ))} */}
          </TabsList>

          {song.lyrics?.map((lyric) => {
            const isLyricOwner = lyric.userId === user?.id;

            return (
              <TabsContent key={lyric.id} value={lyric.user.username}>
                <div key={lyric.id} className="mb-6">
                  {isAuthenticated && isLyricOwner && (
                    <Button asChild size="sm" className="mb-2">
                      <Link
                        to={href("/songs/:slug/lyrics/:id/edit", {
                          slug: song.slug,
                          id: lyric.id,
                        })}
                      >
                        Edit Lyric
                      </Link>
                    </Button>
                  )}

                  <div className="prose text-left text-lg whitespace-pre-line text-white">
                    {parseHTML(lyric.text)}
                  </div>
                </div>
              </TabsContent>
            );
          })}

          {/* {Object.entries(lyricsByUser ?? {}).map(([userId, lyrics]) => (
          <TabsContent key={userId} value={userId} className="mt-4">
            {lyrics?.map((lyric) => {
              const isLyricOwner = lyric.userId === user?.id;
              return (
                <div key={lyric.id} className="mb-6">
                  {isAuthenticated && isLyricOwner && (
                    <Button asChild size="sm" className="mb-2">
                      <Link
                        to={href("/songs/:slug/lyrics/:id/edit", {
                          slug: song.slug,
                          id: lyric.id,
                        })}
                      >
                        Edit Lyric
                      </Link>
                    </Button>
                  )}

                  <div className="prose text-left text-lg whitespace-pre-line text-white">
                    {parseHTML(lyric.text)}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        ))} */}
        </Tabs>
      )}
    </div>
  );
}
