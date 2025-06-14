import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"), // All songs
    route("search", "routes/search.tsx"),
    route("songs/:slug", "routes/song-slug.tsx"),

    route("register", "routes/register.tsx"),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("library", "routes/library.tsx"),

    route("add-song", "routes/add-song.tsx"),
    route("songs/:slug/edit", "routes/songs-slug-edit.tsx"),
    route("songs/:slug/add-lyric", "routes/songs-slug-add-lyric.tsx"),
    route("lyrics/:slug/edit", "routes/songs-slug-edit-lyric.tsx"),

    route("artists", "routes/artists.tsx"),
    route("add-artist", "routes/add-artist.tsx"),
    route("artists/:slug/edit", "routes/artists-slug-edit.tsx"),

    // TODO: /songs/:slug/lyrics/:lyricId/edit
    // fetch to /lyrics/:id
  ]),
] satisfies RouteConfig;
