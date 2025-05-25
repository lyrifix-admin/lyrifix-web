import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"), // songs
    route("songs/:slug", "routes/song-slug.tsx"),
    route("songs/:slug/add-lyric", "routes/songs-slug-add-lyric.tsx"),
    route("artist", "routes/artist.tsx"),
    route("search", "routes/search.tsx"),

    route("register", "routes/register.tsx"),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("library", "routes/library.tsx"),

    route("add-song", "routes/add-song.tsx"),
  ]),
] satisfies RouteConfig;
