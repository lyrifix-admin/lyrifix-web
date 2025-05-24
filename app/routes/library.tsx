import { PlusIcon } from "lucide-react";
import { href, Link, redirect } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import type { paths } from "~/schema";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/library";
import { apiWithToken } from "~/utils/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Library Lyrifix" }];
}

type SuccessResponse =
  paths["/library"]["get"]["responses"][200]["content"]["application/json"];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("token")) return redirect("/login");

  const token = session.get("token");

  try {
    const library = await apiWithToken<SuccessResponse>("/library", {
      method: "GET",
      token: token as string,
    });
    return { library };
  } catch (error) {
    session.flash("error", "Failed to load library");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
}

export default function LibraryRoute({ loaderData }: Route.ComponentProps) {
  const { library } = loaderData;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Your Library</h1>
      <p className="mb-4 text-lg">Welcome back, {library.user.fullName}!</p>

      <Link to="/add-song">
        <Card className="flex flex-col items-center justify-center gap-4 p-6 text-white">
          <CardContent className="flex h-full flex-col items-center justify-center">
            <PlusIcon className="h-12 w-12 text-gray-300" />
            <span className="mt-2 text-sm font-medium text-white">
              Add Song
            </span>
          </CardContent>
        </Card>
      </Link>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {library.songs.map((song) => (
          <li key={song.id}>
            <Link to={href("/songs/:slug", { slug: song.slug })}>
              <Card
                key={song.id}
                className="flex flex-col gap-2 p-4 text-white"
              >
                <h2 className="text-sm font-semibold">{song.title}</h2>

                {song.artists && song.artists.length > 0 && (
                  <ul className="inline-flex flex-wrap gap-2 text-xs">
                    {song.artists.map((artist) => (
                      <li key={artist.id}>{artist.name}</li>
                    ))}
                  </ul>
                )}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
