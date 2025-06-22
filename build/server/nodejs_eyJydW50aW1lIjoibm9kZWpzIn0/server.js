import { createRequestHandler } from "@netlify/vite-plugin-react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Form, NavLink, createCookieSessionStorage, Link, href, redirect, useNavigate, useNavigation, data } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CircleGaugeIcon, UserIcon, HomeIcon, PaletteIcon, ArrowUpIcon, PencilIcon, EyeOff, Eye, Music, PlusIcon, MicVocal, ScrollText, XIcon, AlertCircleIcon, Bold, Italic, Strikethrough } from "lucide-react";
import { createFetch } from "@better-fetch/fetch";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import parse from "html-react-parser";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useForm, useInputControl, getFormProps, getInputProps } from "@conform-to/react";
import { Command as Command$1, useCommandState } from "cmdk";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Paragraph from "@tiptap/extension-paragraph";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "dark",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/images/favicon.png"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto p-4 pt-16",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border-2 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Header() {
  return /* @__PURE__ */ jsxs("header", { className: "bg-background flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsx("a", { href: "/", className: "flex flex-row items-center", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/lyrifix-dark.png",
        alt: "logo",
        className: "h-8 w-24 max-w-[120px] min-w-[50px] rounded-md"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-row items-center", children: /* @__PURE__ */ jsx(Form, { method: "get", action: "/search", className: "", children: /* @__PURE__ */ jsx(
      Input,
      {
        name: "q",
        placeholder: "Search for songs...",
        className: "min-w-2xs"
      }
    ) }) })
  ] });
}
const BottomNavbar = ({ isAuthenticated, user }) => {
  const navLinks = [
    { to: "/", icon: /* @__PURE__ */ jsx(HomeIcon, {}), text: "Home" },
    { to: "/artists", icon: /* @__PURE__ */ jsx(PaletteIcon, {}), text: "Artists" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "grid gap-4",
        isAuthenticated && "grid-cols-4",
        !isAuthenticated && "grid-cols-3"
      ),
      children: [
        navLinks.map((navLink) => {
          return /* @__PURE__ */ jsxs(
            NavLink,
            {
              to: navLink.to,
              className: ({ isActive }) => cn(
                "flex flex-col items-center justify-center p-2",
                isActive && "text-fuchsia-400"
              ),
              children: [
                navLink.icon,
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: navLink.text })
              ]
            },
            navLink.to
          );
        }),
        isAuthenticated && user && /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/library",
            className: ({ isActive }) => cn(
              "flex flex-col items-center justify-center p-2",
              isActive && "text-fuchsia-400"
            ),
            children: [
              /* @__PURE__ */ jsx(CircleGaugeIcon, { className: "mb-1 h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Your Library" })
            ]
          }
        ),
        isAuthenticated && user && /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/logout",
            className: ({ isActive }) => cn(
              "flex flex-col items-center justify-center p-2",
              isActive && "text-fuchsia-400"
            ),
            children: [
              /* @__PURE__ */ jsx(UserIcon, { className: "mb-1 h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: user.username })
            ]
          }
        ),
        !isAuthenticated && !user && /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/login",
            className: ({ isActive }) => cn(
              "flex flex-col items-center justify-center p-2",
              isActive && "text-fuchsia-400"
            ),
            children: [
              /* @__PURE__ */ jsx(UserIcon, { className: "mb-1 h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Login" })
            ]
          }
        )
      ]
    }
  ) });
};
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "__session",
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 604800,
    // 7 days in seconds
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [String(process.env.COOKIE_SECRET_KEY)],
    secure: true
  }
});
async function loader$g({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  if (!isAuthenticated) return {
    isAuthenticated
  };
  const token = session.get("token");
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) return {
    isAuthenticated: false
  };
  const user = await response.json();
  session.set("user", user);
  return {
    isAuthenticated: true,
    user
  };
}
const layout = UNSAFE_withComponentProps(function Layout2({
  loaderData
}) {
  const {
    isAuthenticated,
    user
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-background no-scrollbar relative mx-auto min-h-screen w-full max-w-[500px] overflow-auto",
    children: [/* @__PURE__ */ jsx("div", {
      className: "fixed top-0 left-1/2 z-10 w-full max-w-[500px] -translate-x-1/2",
      children: /* @__PURE__ */ jsx(Header, {})
    }), /* @__PURE__ */ jsx("div", {
      className: "px-4 pt-16 pb-28 sm:px-6 md:px-8",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2",
      children: /* @__PURE__ */ jsx(BottomNavbar, {
        isAuthenticated,
        user
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
function Banner() {
  return /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center pt-4 pb-8", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: "/images/banner.png",
      alt: "banner",
      className: "h-[150px] w-[500px] rounded-2xl object-cover"
    }
  ) });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("text-xl leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("space-y-2", className),
      ...props
    }
  );
}
function SongCard({ song }) {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center text-white shadow-lg",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: song.imageUrl || "https://placehold.co/500x500/EEE/31343C",
            alt: song.title,
            className: "aspect-square h-40 w-40 rounded-2xl object-cover"
          }
        ),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: song.title }),
          /* @__PURE__ */ jsx(CardDescription, { children: song.artists && song.artists.length > 0 && /* @__PURE__ */ jsx("span", { children: song.artists.map((artist) => artist.name).join(", ") }) })
        ] })
      ]
    },
    song.id
  );
}
function createAuthFetch(token) {
  return createFetch({
    baseURL: process.env.BACKEND_API_URL || "http://localhost:3000",
    auth: { type: "Bearer", token }
  });
}
const $fetch = createFetch({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:3000"
});
function meta$f({}) {
  return [{
    title: "Lyrifix"
  }, {
    name: "description",
    content: "Fix the lyric, Feel the music."
  }];
}
async function loader$f({}) {
  const {
    data: songs
  } = await $fetch("/songs");
  return {
    songs
  };
}
const home = UNSAFE_withComponentProps(function Home({
  loaderData
}) {
  const {
    songs
  } = loaderData;
  if (!songs) return null;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Banner, {}), /* @__PURE__ */ jsx("ul", {
      className: "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2",
      children: songs.map((song) => /* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col transition-all duration-200 hover:scale-105",
        children: /* @__PURE__ */ jsx(Link, {
          to: `/songs/${song.slug}`,
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx(SongCard, {
            song
          }, song.id)
        })
      }, song.id))
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$f,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
function meta$e({}) {
  return [{
    title: "Lyrifix | Search"
  }, {
    name: "description",
    content: "Search for your favorite songs and artists on Lyrifix."
  }];
}
async function loader$e({
  request
}) {
  var _a;
  const url = new URL(request.url);
  const q = (_a = url.searchParams.get("q")) == null ? void 0 : _a.trim();
  if (!q) return redirect("/");
  const {
    data: result,
    error
  } = await $fetch("/search", {
    query: {
      q
    }
  });
  if (error) return {
    songs: [],
    artists: [],
    lyrics: []
  };
  return result;
}
const search = UNSAFE_withComponentProps(function SearchRoute({
  loaderData
}) {
  const {
    songs
  } = loaderData;
  if (songs.length <= 0) {
    return /* @__PURE__ */ jsx("div", {
      children: "No songs found"
    });
  }
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx("ul", {
      className: "grid grid-cols-2 gap-4",
      children: songs.map((song) => /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: href("/songs/:slug", {
            slug: song.slug
          }),
          children: /* @__PURE__ */ jsx(SongCard, {
            song
          })
        })
      }, song.id))
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: search,
  loader: loader$e,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 rounded-sm gap-1 px-1.5 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function parseHTML(html) {
  if (!html) return "";
  return parse(html);
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const LyricSchema = z.object({
  id: z.string(),
  slug: z.string(),
  songId: z.string(),
  text: z.string(),
  upvoteCount: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
z.array(LyricSchema);
const CreateLyricSchema = LyricSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
const UpdateLyricSchema = LyricSchema.pick({
  id: true,
  text: true
});
const UpvoteSchema = z.object({
  id: z.string().min(1, "Required")
});
z.array(CreateLyricSchema);
z.array(UpdateLyricSchema);
function meta$d({
  data: data2
}) {
  const song = data2 == null ? void 0 : data2.song;
  if (!song) return [{
    title: `Song not found - Lyrifix`
  }];
  return [{
    title: `${song.title} - Lyrifix`
  }];
}
async function loader$d({
  request,
  params
}) {
  const {
    slug
  } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  const user = session.get("user");
  const {
    data: song,
    error
  } = await $fetch("/songs/:slug", {
    params: {
      slug
    }
  });
  if (error) throw new Response("Song not found", {
    status: 404
  });
  const url = new URL(request.url);
  const lyricSearchParam = url.searchParams.get("lyric");
  return {
    isAuthenticated,
    user,
    song,
    lyricSearchParam
  };
}
async function action$9({
  request
}) {
  const formData = await request.formData();
  console.log("FormData:", Object.fromEntries(formData.entries()));
  const submission = parseWithZod(formData, {
    schema: UpvoteSchema
  });
  console.log("Submission:", submission);
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const {
    id: lyricId
  } = submission.value;
  const actionType = formData.get("action");
  const endpoint = actionType === "cancel" ? `/lyrics/${lyricId}/cancel-upvote` : `/lyrics/${lyricId}/upvote`;
  const {
    data: data2,
    error
  } = await $fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!data2 || error) {
    return {
      success: false,
      message: "Failed to upvote"
    };
  }
  return redirect(request.url);
}
const songSlug = UNSAFE_withComponentProps(function SongSlug({
  loaderData
}) {
  var _a, _b, _c, _d;
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    song,
    lyricSearchParam
  } = loaderData;
  const lyricsByUser = {};
  for (const lyric of song.lyrics ?? []) {
    const key = lyric.userId ?? "_unknown";
    if (!lyricsByUser[key]) {
      lyricsByUser[key] = [];
    }
    lyricsByUser[key].push(lyric);
  }
  const isAlreadyAddedLyric = (_a = song.lyrics) == null ? void 0 : _a.find((lyric) => lyric.userId === (user == null ? void 0 : user.id));
  const hasLyrics = Array.isArray(song.lyrics) && song.lyrics.length > 0;
  const firstUsername = Array.isArray(song.lyrics) ? (_b = song.lyrics[0]) == null ? void 0 : _b.user.username : "";
  const selectedLyricTab = lyricSearchParam ? lyricSearchParam : firstUsername;
  function handleLyricTabChange(value) {
    navigate(`/songs/${song.slug}?lyric=${value}`);
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "my-8 overflow-x-hidden",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "flex flex-col items-center justify-center gap-2",
      children: [/* @__PURE__ */ jsx("img", {
        src: song.imageUrl || "https://placehold.co/500x500/EEE/31343C",
        alt: song.title,
        className: "h-40 w-40 rounded-2xl object-cover"
      }), /* @__PURE__ */ jsx("h2", {
        className: "text-center text-3xl font-bold text-white",
        children: song.title
      }), /* @__PURE__ */ jsx("p", {
        className: "text-sm text-gray-400",
        children: song.artists && song.artists.length > 0 && song.artists.map((artist) => artist.name).join(", ")
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-2",
        children: [isAuthenticated && /* @__PURE__ */ jsx(Button, {
          asChild: true,
          size: "sm",
          children: /* @__PURE__ */ jsx(Link, {
            to: href("/songs/:slug/edit", {
              slug: song.slug
            }),
            children: "Edit Song"
          })
        }), isAuthenticated && !isAlreadyAddedLyric && /* @__PURE__ */ jsx(Button, {
          asChild: true,
          size: "sm",
          children: /* @__PURE__ */ jsx(Link, {
            to: href("/songs/:slug/add-lyric", {
              slug: song.slug
            }),
            children: "Add Lyric"
          })
        }), song.spotifyUrl && /* @__PURE__ */ jsx(Button, {
          size: "sm",
          asChild: true,
          children: /* @__PURE__ */ jsxs(Link, {
            to: song.spotifyUrl,
            target: "_blank",
            children: [/* @__PURE__ */ jsx("img", {
              src: "/images/spotify.svg",
              alt: "Spotify",
              className: "h-4 w-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Spotify"
            })]
          })
        })]
      })]
    }), hasLyrics && /* @__PURE__ */ jsxs(Tabs, {
      defaultValue: selectedLyricTab,
      onValueChange: handleLyricTabChange,
      className: "mt-4 w-full",
      children: [/* @__PURE__ */ jsx(TabsList, {
        className: "scrollbar-thin flex max-w-full overflow-x-auto whitespace-nowrap",
        children: (_c = song.lyrics) == null ? void 0 : _c.map((lyric) => {
          return /* @__PURE__ */ jsxs(TabsTrigger, {
            value: lyric.user.username,
            children: [lyric.user.username, " (", lyric.upvoteCount, ")"]
          }, lyric.id);
        })
      }), (_d = song.lyrics) == null ? void 0 : _d.map((lyric) => {
        const isLyricOwner = lyric.userId === (user == null ? void 0 : user.id);
        const isUpvoted = lyric.votes.some((vote) => vote.user.id === (user == null ? void 0 : user.id));
        return /* @__PURE__ */ jsx(TabsContent, {
          value: lyric.user.username,
          children: /* @__PURE__ */ jsxs("div", {
            className: "mb-6",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "mb-6 inline-flex flex-col gap-1 sm:flex-row sm:items-center sm:space-x-4",
              children: [isAuthenticated && /* @__PURE__ */ jsxs(Form, {
                method: "POST",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "hidden",
                  name: "id",
                  value: lyric.id
                }), /* @__PURE__ */ jsx("input", {
                  type: "hidden",
                  name: "action",
                  value: isUpvoted ? "cancel" : "upvote"
                }), /* @__PURE__ */ jsxs(Button, {
                  type: "submit",
                  size: "xs",
                  className: "mb-2 flex items-center space-x-1",
                  children: [/* @__PURE__ */ jsx(ArrowUpIcon, {
                    className: "h-4 w-4"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Upvote"
                  })]
                })]
              }), isAuthenticated && isLyricOwner && /* @__PURE__ */ jsx(Button, {
                asChild: true,
                size: "sm",
                className: "mb-2",
                children: /* @__PURE__ */ jsxs(Link, {
                  to: href("/songs/:slug/lyrics/:id/edit", {
                    slug: song.slug,
                    id: lyric.id
                  }),
                  children: [/* @__PURE__ */ jsx(PencilIcon, {
                    className: "h-4 w-4"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Edit Lyric"
                  })]
                })
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "prose text-left text-lg whitespace-pre-line text-white",
              children: parseHTML(lyric.text)
            })]
          }, lyric.id)
        }, lyric.id);
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9,
  default: songSlug,
  loader: loader$d,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const RegisterSchema = z.object({
  fullName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 carachter" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/\d/, {
    message: "Password must contain at least one number"
  }).regex(/\W/, {
    message: "Password must contain at least one special character"
  }).refine((val) => !/\s/.test(val), {
    message: "Password must not contain spaces"
  })
});
const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true
});
function meta$c({}) {
  return [{
    title: "Register Lyrifix"
  }, {
    name: "description",
    content: "Register to Lyrifix. Fix the lyric, Feel the music."
  }];
}
async function action$8({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: RegisterSchema
  });
  if (submission.status !== "success") return submission.reply();
  const {
    data: data2,
    error
  } = await $fetch("/auth/register", {
    method: "POST",
    body: submission.value
  });
  if (!data2 || error) return submission.reply();
  return redirect("/login");
}
const register = UNSAFE_withComponentProps(function RegisterRoute({
  actionData
}) {
  var _a;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: RegisterSchema
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur"
  });
  const [showPassword, setShowPassword] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center pt-10",
    children: [/* @__PURE__ */ jsxs(Card, {
      className: "w-xs",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          className: "text-center font-bold",
          children: "Register"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: "/register",
          className: "mr-4 ml-4 grid grid-cols-1 gap-4",
          onSubmit: form.onSubmit,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "fullName",
              children: "Full Name"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.fullName.name,
              id: "fullName",
              placeholder: "John Doe",
              defaultValue: fields.fullName.initialValue
            }, fields.fullName.key), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.fullName.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "fullName",
              children: "Username"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.username.name,
              id: "username",
              placeholder: "john",
              defaultValue: fields.username.initialValue
            }, fields.username.key), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.username.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "email",
              children: "Email"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.email.name,
              id: "email",
              placeholder: "user@example.com",
              defaultValue: fields.email.initialValue
            }, fields.email.key), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.email.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative flex min-h-[72px] flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "password",
              children: "Password"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.password.name,
              id: "password",
              type: showPassword ? "text" : "password",
              className: "pr-10",
              defaultValue: fields.password.initialValue
            }, fields.password.key), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setShowPassword((prev) => !prev),
              className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2",
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, {
                size: 18
              }) : /* @__PURE__ */ jsx(Eye, {
                size: 18
              })
            })]
          }), (_a = fields.password.errors) == null ? void 0 : _a.map((error, index) => /* @__PURE__ */ jsx("li", {
            className: "text-sm text-red-500",
            children: error
          }, index)), /* @__PURE__ */ jsx(Button, {
            className: "flex-1",
            disabled: isSubmitting,
            children: isSubmitting ? "Registering..." : "Register"
          })]
        })
      })]
    }), /* @__PURE__ */ jsxs("section", {
      className: "mt-4 text-sm text-white",
      children: ["Already have an account?", " ", /* @__PURE__ */ jsx("a", {
        href: "/login",
        className: "text-fuchsia-500 hover:underline",
        children: "Login here"
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: register,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
function meta$b({}) {
  return [{
    title: "Login to Lyrifix"
  }];
}
async function loader$c({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return redirect(href("/library"));
  }
  return data({
    error: session.get("error")
  }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
async function action$7({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: LoginSchema
  });
  if (submission.status !== "success") return submission.reply();
  const {
    data: data2,
    error
  } = await $fetch("/auth/login", {
    method: "POST",
    body: submission.value
  });
  if (!data2 || error) {
    return submission.reply({
      fieldErrors: {
        email: ["Failed to login, try again."]
      }
    });
  }
  session.set("token", data2.token);
  session.set("isAuthenticated", true);
  const $authFetch = createAuthFetch(data2.token);
  const {
    data: userProfile,
    error: userError
  } = await $authFetch("/auth/me");
  if (!userProfile || userError) {
    return submission.reply({
      fieldErrors: {
        email: ["Failed to fetch user profile."]
      }
    });
  }
  session.set("user", userProfile);
  return redirect(href("/library"), {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
const login = UNSAFE_withComponentProps(function LoginRoute({
  actionData
}) {
  var _a;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: LoginSchema
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur"
  });
  const [showPassword, setShowPassword] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center pt-10",
    children: [/* @__PURE__ */ jsxs(Card, {
      className: "w-xs",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          className: "text-center font-bold",
          children: "Login"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: "/login",
          className: "mr-4 ml-4 grid grid-cols-1 gap-4",
          onSubmit: form.onSubmit,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "email",
              children: "Email"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.email.name,
              id: "email",
              placeholder: "user@example.com"
            }, fields.email.key), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.email.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative flex min-h-[72px] flex-col space-y-1.5",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "password",
              children: "Password"
            }), /* @__PURE__ */ jsx(Input, {
              name: fields.password.name,
              id: "password",
              type: showPassword ? "text" : "password",
              className: "pr-10"
            }, fields.password.key), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setShowPassword((prev) => !prev),
              className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2",
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, {
                size: 18
              }) : /* @__PURE__ */ jsx(Eye, {
                size: 18
              })
            })]
          }), (_a = fields.password.errors) == null ? void 0 : _a.map((error, index) => /* @__PURE__ */ jsx("li", {
            className: "text-sm text-red-500",
            children: error
          }, index)), /* @__PURE__ */ jsx(Button, {
            className: "flex-1",
            disabled: isSubmitting,
            children: isSubmitting ? "Logging in..." : "Login"
          })]
        })
      })]
    }), /* @__PURE__ */ jsxs("section", {
      className: "mt-4 text-sm text-white",
      children: ["Do not have an account?", " ", /* @__PURE__ */ jsx("a", {
        href: "/register",
        className: "text-fuchsia-500 hover:underline",
        children: "Register here"
      })]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  default: login,
  loader: loader$c,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
async function loader$b({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");
}
async function action$6({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}
const logout = UNSAFE_withComponentProps(function LogoutRoute() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-md",
      children: "Are you sure you want to log out?"
    }), /* @__PURE__ */ jsx(Form, {
      method: "post",
      className: "mr-4 ml-4 grid grid-cols-1 gap-4",
      children: /* @__PURE__ */ jsx(Button, {
        className: "text-md mt-4 flex-1",
        children: "Logout"
      })
    }), /* @__PURE__ */ jsx(Link, {
      to: "/",
      className: "bg-card y-4 mt-4 flex h-9 flex-1 items-center justify-center rounded-md",
      children: "Never mind"
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: logout,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [{
    title: "Library Lyrifix"
  }];
}
async function loader$a({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!session.has("token") || !token) return redirect("/login");
  const {
    data: library2,
    error
  } = await $fetch("/library", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (error) {
    session.flash("error", "Failed to load your library");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session)
      }
    });
  }
  return {
    library: library2
  };
}
const library = UNSAFE_withComponentProps(function LibraryRoute({
  loaderData
}) {
  const {
    library: library2
  } = loaderData;
  if (!library2) return null;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 text-white",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      children: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: "Your Library"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-lg text-gray-300",
          children: ["Welcome back, ", library2.user.fullName, "!"]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-sm text-gray-400",
          children: [library2.songs.length, " ", library2.songs.length === 1 ? "song" : "songs", " in your collection"]
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex justify-center gap-2",
      children: [/* @__PURE__ */ jsx(Button, {
        asChild: true,
        children: /* @__PURE__ */ jsx(Link, {
          to: "/library-artist",
          children: "Artist"
        })
      }), /* @__PURE__ */ jsx(Button, {
        children: /* @__PURE__ */ jsx(Link, {
          to: "/library-lyric",
          children: "Lyric"
        })
      })]
    }), library2.songs.length === 0 ? /* @__PURE__ */ jsxs("div", {
      className: "py-12 text-center",
      children: [/* @__PURE__ */ jsx(Music, {
        className: "mx-auto mb-4 h-16 w-16 text-gray-400"
      }), /* @__PURE__ */ jsx("h3", {
        className: "mb-2 text-xl font-semibold text-gray-300",
        children: "Your library is empty"
      }), /* @__PURE__ */ jsx("p", {
        className: "mb-6 text-gray-400",
        children: "Start building your collection by adding your first song"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col flex-wrap items-center gap-2",
        children: [/* @__PURE__ */ jsx(Button, {
          asChild: true,
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/",
            children: [/* @__PURE__ */ jsx(PlusIcon, {
              className: "mr-2 h-4 w-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Explore Songs to Add Lyric"
            })]
          })
        }), /* @__PURE__ */ jsx(Button, {
          asChild: true,
          variant: "secondary",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/add-song",
            children: [/* @__PURE__ */ jsx(PlusIcon, {
              className: "mr-2 h-4 w-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Add Your First Song"
            })]
          })
        })]
      })]
    }) : /* @__PURE__ */ jsxs("ul", {
      className: "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2",
      children: [/* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/add-song",
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx("div", {
            className: "group flex h-full flex-col rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gray-800/50 p-6 transition-all duration-200 hover:scale-105 hover:border-fuchsia-500 hover:bg-gray-800",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex flex-1 flex-col items-center justify-center",
              children: [/* @__PURE__ */ jsx(PlusIcon, {
                className: "h-8 w-8 text-fuchsia-400 transition-colors group-hover:text-fuchsia-300"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-fuchisa-400 mt-2 text-sm font-medium group-hover:text-fuchsia-300",
                children: "Add New Song"
              })]
            })
          })
        })
      }), library2.songs.map((song) => /* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col transition-all duration-200 hover:scale-105",
        children: /* @__PURE__ */ jsx(Link, {
          to: `/songs/${song.slug}`,
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx(SongCard, {
            song
          })
        })
      }, song.id))]
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: library,
  loader: loader$a,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function meta$9({}) {
  return [{
    title: "Library Lyrifix"
  }];
}
async function loader$9({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!session.has("token") || !token) return redirect("/login");
  const {
    data: library2,
    error
  } = await $fetch("/library", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (error) {
    session.flash("error", "Failed to load your library");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session)
      }
    });
  }
  return {
    library: library2
  };
}
const libraryArtist = UNSAFE_withComponentProps(function LibraryArtistRoute({
  loaderData
}) {
  const {
    library: library2
  } = loaderData;
  if (!library2) return null;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 text-white",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      children: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: "Your Artist Library"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-lg text-gray-300",
          children: ["Welcome back, ", library2.user.fullName, "!"]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-sm text-gray-400",
          children: [library2.artists.length, " ", library2.artists.length === 1 ? "artist" : "artists", " in your collection"]
        })]
      })
    }), library2.artists.length === 0 ? /* @__PURE__ */ jsxs("div", {
      className: "py-12 text-center",
      children: [/* @__PURE__ */ jsx(MicVocal, {
        className: "mx-auto mb-4 h-16 w-16 text-gray-400"
      }), /* @__PURE__ */ jsx("h3", {
        className: "mb-2 text-xl font-semibold text-gray-300",
        children: "Your artist library is empty"
      }), /* @__PURE__ */ jsx("p", {
        className: "mb-6 text-gray-400",
        children: "Start your collection by adding your first artist"
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-col flex-wrap items-center gap-2",
        children: /* @__PURE__ */ jsx(Button, {
          asChild: true,
          variant: "secondary",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/add-artist",
            children: [/* @__PURE__ */ jsx(PlusIcon, {
              className: "mr-2 h-4 w-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Add Your First Artist"
            })]
          })
        })
      })]
    }) : /* @__PURE__ */ jsxs("ul", {
      className: "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2",
      children: [/* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/add-artist",
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx("div", {
            className: "group flex h-full flex-col rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gray-800/50 p-6 transition-all duration-200 hover:scale-105 hover:border-fuchsia-500 hover:bg-gray-800",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex flex-1 flex-col items-center justify-center",
              children: [/* @__PURE__ */ jsx(PlusIcon, {
                className: "h-8 w-8 text-fuchsia-400 transition-colors group-hover:text-fuchsia-300"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-fuchisa-400 mt-2 text-sm font-medium group-hover:text-fuchsia-300",
                children: "Add New Artist"
              })]
            })
          })
        })
      }), library2.artists.map((artist) => /* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col transition-all duration-200 hover:scale-105",
        children: /* @__PURE__ */ jsx(Link, {
          to: `/artists/${artist.slug}`,
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsxs(Card, {
            className: "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center break-words text-white shadow-lg",
            children: [/* @__PURE__ */ jsx("img", {
              src: artist.imageUrl || "https://placehold.co/500x500/EEE/31343C",
              alt: artist.name,
              className: "aspect-square h-40 w-40 rounded-2xl object-cover"
            }), /* @__PURE__ */ jsx(CardContent, {
              children: /* @__PURE__ */ jsx(CardTitle, {
                className: "w-full max-w-xs text-center break-words",
                children: artist.name
              })
            })]
          }, artist.id)
        })
      }, artist.id))]
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: libraryArtist,
  loader: loader$9,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [{
    title: "Library Lyrifix"
  }];
}
async function loader$8({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  if (!session.has("token") || !token || !user) return redirect("/login");
  const {
    data: library2,
    error
  } = await $fetch("/library", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (error) {
    session.flash("error", "Failed to load your library");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session)
      }
    });
  }
  return {
    library: library2,
    user
  };
}
const libraryLyric = UNSAFE_withComponentProps(function LibraryLyricRoute({
  loaderData
}) {
  const {
    library: library2,
    user
  } = loaderData;
  if (!library2) return null;
  console.log(library2.lyrics);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 text-white",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      children: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: "Your Lyric Library"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-lg text-gray-300",
          children: ["Welcome back, ", library2.user.fullName, "!"]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-sm text-gray-400",
          children: [library2.lyrics.length, " ", library2.lyrics.length === 1 ? "lyric" : "lyrics", " in your collection"]
        })]
      })
    }), library2.lyrics.length === 0 ? /* @__PURE__ */ jsxs("div", {
      className: "py-12 text-center",
      children: [/* @__PURE__ */ jsx(ScrollText, {
        className: "mx-auto mb-4 h-16 w-16 text-gray-400"
      }), /* @__PURE__ */ jsx("h3", {
        className: "mb-2 text-xl font-semibold text-gray-300",
        children: "Your lyric library is empty"
      }), /* @__PURE__ */ jsx("p", {
        className: "mb-6 text-gray-400",
        children: "Start your collection by adding your first lyric"
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-col flex-wrap items-center gap-2",
        children: /* @__PURE__ */ jsx(Button, {
          asChild: true,
          variant: "secondary",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/",
            children: [/* @__PURE__ */ jsx(PlusIcon, {
              className: "mr-2 h-4 w-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Explore Songs to Add Your First Lyric"
            })]
          })
        })
      })]
    }) : /* @__PURE__ */ jsxs("ul", {
      className: "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2",
      children: [/* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx("div", {
            className: "group flex h-full flex-col rounded-lg border-2 border-dashed border-fuchsia-500/50 bg-gray-800/50 p-6 transition-all duration-200 hover:scale-105 hover:border-fuchsia-500 hover:bg-gray-800",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex flex-1 flex-col items-center justify-center",
              children: [/* @__PURE__ */ jsx(PlusIcon, {
                className: "h-8 w-8 text-fuchsia-400 transition-colors group-hover:text-fuchsia-300"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-fuchisa-400 mt-2 text-sm font-medium group-hover:text-fuchsia-300",
                children: "Explore Songs to Lyric"
              })]
            })
          })
        })
      }), library2.lyrics.map((lyric) => /* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col transition-all duration-200 hover:scale-105",
        children: /* @__PURE__ */ jsx(Link, {
          to: `/songs/${lyric.song.slug}?lyric=${user.username}`,
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsx(SongCard, {
            song: lyric.song
          })
        })
      }, lyric.id))]
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: libraryLyric,
  loader: loader$8,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md",
        className
      ),
      ...props
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn("max-h-80 overflow-x-hidden overflow-y-auto", className),
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      ),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default items-center gap-3 rounded-md px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props
    }
  );
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
function transToGroupOption(options, groupBy) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options
    };
  }
  const groupOption = {};
  options.forEach((option) => {
    const key = option[groupBy] || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}
function removePickedOption(groupOption, picked) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption));
  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    );
  }
  return cloneOption;
}
function isOptionsExist(groupOption, targetOption) {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
      return true;
    }
  }
  return false;
}
const CommandEmpty = ({
  className,
  ...props
}) => {
  const render = useCommandState((state) => state.filtered.count === 0);
  if (!render) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("px-2 py-4 text-center text-sm", className),
      role: "presentation",
      ...props
    }
  );
};
CommandEmpty.displayName = "CommandEmpty";
const MultipleSelector = ({
  value,
  onChange,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  hideClearAllButton = false
}) => {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [onScrollbar, setOnScrollbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const [selected, setSelected] = React.useState(value || []);
  const [options, setOptions] = React.useState(
    transToGroupOption(arrayDefaultOptions, groupBy)
  );
  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
      inputRef.current.blur();
    }
  };
  const handleUnselect = React.useCallback(
    (option) => {
      const newOptions = selected.filter((s) => s.value !== option.value);
      setSelected(newOptions);
      onChange == null ? void 0 : onChange(newOptions);
    },
    [onChange, selected]
  );
  const handleKeyDown = React.useCallback(
    (e) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const lastSelectOption = selected[selected.length - 1];
            if (!(lastSelectOption == null ? void 0 : lastSelectOption.fixed)) {
              handleUnselect(selected[selected.length - 1]);
            }
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [handleUnselect, selected]
  );
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchend", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open]);
  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);
  useEffect(() => {
    if (!arrayOptions || onSearch) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);
  useEffect(() => {
    const doSearchSync = () => {
      const res = onSearchSync == null ? void 0 : onSearchSync(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
    };
    const exec = async () => {
      if (!onSearchSync || !open) return;
      if (triggerSearchOnFocus) {
        doSearchSync();
      }
      if (debouncedSearchTerm) {
        doSearchSync();
      }
    };
    void exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);
  useEffect(() => {
    const doSearch = async () => {
      setIsLoading(true);
      const res = await (onSearch == null ? void 0 : onSearch(debouncedSearchTerm));
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };
    const exec = async () => {
      if (!onSearch || !open) return;
      if (triggerSearchOnFocus) {
        await doSearch();
      }
      if (debouncedSearchTerm) {
        await doSearch();
      }
    };
    void exec();
  }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);
  const CreatableItem = () => {
    if (!creatable) return void 0;
    if (isOptionsExist(options, [{ value: inputValue, label: inputValue }]) || selected.find((s) => s.value === inputValue)) {
      return void 0;
    }
    const Item = /* @__PURE__ */ jsx(
      CommandItem,
      {
        value: inputValue,
        className: "cursor-pointer",
        onMouseDown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onSelect: (value2) => {
          if (selected.length >= maxSelected) {
            onMaxSelected == null ? void 0 : onMaxSelected(selected.length);
            return;
          }
          setInputValue("");
          const newOptions = [...selected, { value: value2, label: value2 }];
          setSelected(newOptions);
          onChange == null ? void 0 : onChange(newOptions);
        },
        children: `Create "${inputValue}"`
      }
    );
    if (!onSearch && inputValue.length > 0) {
      return Item;
    }
    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
      return Item;
    }
    return void 0;
  };
  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) return void 0;
    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return /* @__PURE__ */ jsx(CommandItem, { value: "-", disabled: true, children: emptyIndicator });
    }
    return /* @__PURE__ */ jsx(CommandEmpty, { children: emptyIndicator });
  }, [creatable, emptyIndicator, onSearch, options]);
  const selectables = React.useMemo(
    () => removePickedOption(options, selected),
    [options, selected]
  );
  const commandFilter = React.useCallback(() => {
    if (commandProps == null ? void 0 : commandProps.filter) {
      return commandProps.filter;
    }
    if (creatable) {
      return (value2, search2) => {
        return value2.toLowerCase().includes(search2.toLowerCase()) ? 1 : -1;
      };
    }
    return void 0;
  }, [creatable, commandProps == null ? void 0 : commandProps.filter]);
  return /* @__PURE__ */ jsxs(
    Command,
    {
      ref: dropdownRef,
      ...commandProps,
      onKeyDown: (e) => {
        var _a;
        handleKeyDown(e);
        (_a = commandProps == null ? void 0 : commandProps.onKeyDown) == null ? void 0 : _a.call(commandProps, e);
      },
      className: cn(
        "h-auto overflow-visible bg-transparent",
        commandProps == null ? void 0 : commandProps.className
      ),
      shouldFilter: (commandProps == null ? void 0 : commandProps.shouldFilter) !== void 0 ? commandProps.shouldFilter : !onSearch,
      filter: commandFilter(),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative min-h-[38px] rounded-md border text-sm transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
              {
                "p-1": selected.length !== 0,
                "cursor-text": !disabled && selected.length !== 0
              },
              !hideClearAllButton && "pe-9",
              className
            ),
            onClick: () => {
              var _a;
              if (disabled) return;
              (_a = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a.focus();
            },
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
              selected.map((option) => {
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "animate-fadeIn bg-background text-secondary-foreground hover:bg-background relative inline-flex h-7 cursor-default items-center rounded-md border ps-2 pe-7 pl-2 text-xs font-medium transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2",
                      badgeClassName
                    ),
                    "data-fixed": option.fixed,
                    "data-disabled": disabled || void 0,
                    children: [
                      option.label,
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                          onKeyDown: (e) => {
                            if (e.key === "Enter") {
                              handleUnselect(option);
                            }
                          },
                          onMouseDown: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          },
                          onClick: () => handleUnselect(option),
                          "aria-label": "Remove",
                          children: /* @__PURE__ */ jsx(XIcon, { size: 14, "aria-hidden": "true" })
                        }
                      )
                    ]
                  },
                  option.value
                );
              }),
              /* @__PURE__ */ jsx(
                Command$1.Input,
                {
                  ...inputProps,
                  ref: inputRef,
                  value: inputValue,
                  disabled,
                  onValueChange: (value2) => {
                    var _a;
                    setInputValue(value2);
                    (_a = inputProps == null ? void 0 : inputProps.onValueChange) == null ? void 0 : _a.call(inputProps, value2);
                  },
                  onBlur: (event) => {
                    var _a;
                    if (!onScrollbar) {
                      setOpen(false);
                    }
                    (_a = inputProps == null ? void 0 : inputProps.onBlur) == null ? void 0 : _a.call(inputProps, event);
                  },
                  onFocus: (event) => {
                    var _a;
                    setOpen(true);
                    if (triggerSearchOnFocus) {
                      onSearch == null ? void 0 : onSearch(debouncedSearchTerm);
                    }
                    (_a = inputProps == null ? void 0 : inputProps.onFocus) == null ? void 0 : _a.call(inputProps, event);
                  },
                  placeholder: hidePlaceholderWhenSelected && selected.length !== 0 ? "" : placeholder,
                  className: cn(
                    "placeholder:text-muted-foreground/70 flex-1 bg-transparent outline-hidden disabled:cursor-not-allowed",
                    {
                      "w-full": hidePlaceholderWhenSelected,
                      "px-3 py-2": selected.length === 0,
                      "ml-1": selected.length !== 0
                    },
                    inputProps == null ? void 0 : inputProps.className
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelected(selected.filter((s) => s.fixed));
                    onChange == null ? void 0 : onChange(selected.filter((s) => s.fixed));
                  },
                  className: cn(
                    "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute end-0 top-0 flex size-9 items-center justify-center rounded-md border border-transparent transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                    (hideClearAllButton || disabled || selected.length < 1 || selected.filter((s) => s.fixed).length === selected.length) && "hidden"
                  ),
                  "aria-label": "Clear all",
                  children: /* @__PURE__ */ jsx(XIcon, { size: 16, "aria-hidden": "true" })
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "border-input absolute top-2 z-10 w-full overflow-hidden rounded-md border",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              !open && "hidden"
            ),
            "data-state": open ? "open" : "closed",
            children: open && /* @__PURE__ */ jsx(
              CommandList,
              {
                className: "bg-popover text-popover-foreground shadow-lg outline-hidden",
                onMouseLeave: () => {
                  setOnScrollbar(false);
                },
                onMouseEnter: () => {
                  setOnScrollbar(true);
                },
                onMouseUp: () => {
                  var _a;
                  (_a = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a.focus();
                },
                children: isLoading ? /* @__PURE__ */ jsx(Fragment, { children: loadingIndicator }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  EmptyItem(),
                  CreatableItem(),
                  !selectFirstItem && /* @__PURE__ */ jsx(CommandItem, { value: "-", className: "hidden" }),
                  Object.entries(selectables).map(([key, dropdowns]) => /* @__PURE__ */ jsx(
                    CommandGroup,
                    {
                      heading: key,
                      className: "h-full overflow-auto",
                      children: /* @__PURE__ */ jsx(Fragment, { children: dropdowns.map((option) => {
                        return /* @__PURE__ */ jsx(
                          CommandItem,
                          {
                            value: option.value,
                            disabled: option.disable,
                            onMouseDown: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            },
                            onSelect: () => {
                              if (selected.length >= maxSelected) {
                                onMaxSelected == null ? void 0 : onMaxSelected(selected.length);
                                return;
                              }
                              setInputValue("");
                              const newOptions = [...selected, option];
                              setSelected(newOptions);
                              onChange == null ? void 0 : onChange(newOptions);
                            },
                            className: cn(
                              "cursor-pointer",
                              option.disable && "pointer-events-none cursor-not-allowed opacity-50"
                            ),
                            children: option.label
                          },
                          option.value
                        );
                      }) })
                    },
                    key
                  ))
                ] })
              }
            )
          }
        ) })
      ]
    }
  );
};
MultipleSelector.displayName = "MultipleSelector";
function MultiselectArtists({
  defaultOptions,
  artistOptions,
  handleChangeArtistOptions,
  placeholder,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: "*:not-first:mt-2", children: /* @__PURE__ */ jsx(
    MultipleSelector,
    {
      defaultOptions,
      value: artistOptions,
      onChange: handleChangeArtistOptions,
      className,
      placeholder: placeholder || "Select artists",
      emptyIndicator: /* @__PURE__ */ jsx("p", { className: "text-center text-sm", children: "No results found" }),
      commandProps: { label: "Select artists" }
    }
  ) });
}
function SingleFileUploader({
  publicKey,
  value,
  onChange,
  ctxName
}) {
  const handleChange = (data2) => {
    const file = data2.allEntries.find((f) => f.status === "success");
    if (file && file.cdnUrl) {
      onChange(file.cdnUrl);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(
      FileUploaderRegular,
      {
        ctxName: ctxName || "single-file-uploader",
        classNameUploader: "uc-dark",
        className: "fileUploaderWrapper",
        pubkey: publicKey,
        multiple: false,
        imgOnly: true,
        onChange: handleChange
      }
    ),
    value && /* @__PURE__ */ jsx(
      "img",
      {
        src: value,
        alt: "Preview",
        className: "mt-4 max-h-40 rounded shadow"
      }
    )
  ] }) });
}
const ArtistSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
const CreateArtistSchema = ArtistSchema.pick({
  name: true,
  imageUrl: true
});
const UpdateArtistSchema = ArtistSchema.pick({
  id: true,
  name: true,
  imageUrl: true
});
const SongSchema = z.object({
  id: z.string().ulid(),
  slug: z.string(),
  title: z.string(),
  imageUrl: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  artists: z.array(ArtistSchema),
  lyrics: z.array(LyricSchema)
});
z.array(SongSchema);
const CreateSongSchema = z.object({
  imageUrl: z.string().min(1),
  title: z.string().min(1),
  artistIds: z.array(z.string().min(1)),
  userId: z.string().ulid().optional(),
  spotifyUrl: z.string().optional().transform((val) => (val == null ? void 0 : val.trim()) ? val : null)
});
const UpdateSongSchema = z.object({
  id: z.string().ulid(),
  imageUrl: z.string().min(1),
  title: z.string().min(1),
  artistIds: z.array(z.string().min(1)),
  spotifyUrl: z.string().optional().transform((val) => (val == null ? void 0 : val.trim()) ? val : null)
});
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function meta$7({}) {
  return [{
    title: "Add New Song to Lyrifix"
  }];
}
async function loader$7({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const {
    data: artists2,
    error
  } = await $fetch2("/artists");
  if (!artists2 || error) throw new Response("No artists data", {
    status: 500
  });
  return {
    artists: artists2,
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? ""
  };
}
async function action$5({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: CreateSongSchema
  });
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const payload = {
    ...submission.value,
    userId
  };
  const {
    data: song,
    error
  } = await $fetch2("/songs", {
    method: "POST",
    body: payload
  });
  if (!song || error) {
    const errorMessage = typeof error.error === "string" ? error.error : "Failed to add song.";
    return submission.reply({
      formErrors: [errorMessage]
    });
  }
  return redirect(href("/songs/:slug", {
    slug: song.slug
  }));
}
const addSong = UNSAFE_withComponentProps(function AddSongRoute({
  actionData,
  loaderData
}) {
  const {
    artists: artists2,
    uploadcarePublicKey
  } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: CreateSongSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      imageUrl: "",
      title: "",
      artistIds: []
      // ["abc", "def"],
    }
  });
  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");
  const artistIdsFieldList = fields.artistIds.getFieldList();
  const defaultOptions = artists2.map((artist) => ({
    value: artist.id,
    label: artist.name
  }));
  const controlArtistIds = useInputControl(fields.artistIds);
  const [artistOptions, setArtistOptions] = useState([]);
  const handleChangeArtistOptions = (options) => {
    setArtistOptions(options);
    const artistIds = options.map((option) => option.value);
    controlArtistIds.change(artistIds);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col items-center pt-10",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "w-xs",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          className: "text-center font-bold",
          children: "Add New Song"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          ...getFormProps(form),
          className: "mr-4 ml-4 space-y-4",
          children: [form.errors && /* @__PURE__ */ jsxs(Alert, {
            variant: "destructive",
            children: [/* @__PURE__ */ jsx(AlertCircleIcon, {}), /* @__PURE__ */ jsx(AlertTitle, {
              children: form.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: fields.title.id,
              children: "Song Title *"
            }), /* @__PURE__ */ jsx(Input, {
              ...getInputProps(fields.title, {
                type: "text"
              }),
              placeholder: "Song Title",
              className: "border-zinc-700 bg-zinc-800"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.title.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: fields.artistIds.id,
              children: "Select Artists *"
            }), /* @__PURE__ */ jsx(MultiselectArtists, {
              defaultOptions,
              artistOptions,
              handleChangeArtistOptions,
              id: "artist",
              placeholder: "Type artist name...",
              className: "border-zinc-700 bg-zinc-800"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.artistIds.errors
            }), /* @__PURE__ */ jsx("ul", {
              children: artistIdsFieldList.map((artistId) => /* @__PURE__ */ jsxs("li", {
                children: [/* @__PURE__ */ jsx("input", {
                  name: artistId.name
                }), /* @__PURE__ */ jsx("div", {
                  children: artistId.errors
                })]
              }, artistId.key))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: fields.spotifyUrl.id,
              children: "Spotify URL"
            }), /* @__PURE__ */ jsx(Input, {
              ...getInputProps(fields.spotifyUrl, {
                type: "text"
              }),
              placeholder: "Spotify URL",
              className: "border-zinc-700 bg-zinc-800"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.spotifyUrl.errors
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex cursor-pointer flex-col items-center",
            children: [/* @__PURE__ */ jsxs("label", {
              htmlFor: fields.imageUrl.id,
              children: [/* @__PURE__ */ jsx(SingleFileUploader, {
                value: imageUrl,
                onChange: setImageUrl,
                publicKey: uploadcarePublicKey
              }), /* @__PURE__ */ jsx("input", {
                ...getInputProps(fields.imageUrl, {
                  type: "text"
                }),
                value: imageUrl,
                readOnly: true,
                className: "hidden"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.imageUrl.errors
            })]
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(Button, {
              className: "w-full",
              disabled: isSubmitting,
              children: isSubmitting ? "Saving Song..." : "Save Song"
            })
          })]
        })
      })]
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: addSong,
  loader: loader$7,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [{
    title: "Lyrifix - Edit Song"
  }, {
    name: "description",
    content: "Edit song"
  }];
}
async function loader$6({
  params,
  request
}) {
  const {
    slug
  } = params;
  const [songResponse, artistsResponse] = await Promise.all([$fetch("/songs/:slug", {
    params: {
      slug
    }
  }), $fetch("/artists")]);
  if (songResponse.error) throw new Response("Song not found", {
    status: 404
  });
  if (!artistsResponse.data || artistsResponse.error) throw new Response("No artists data", {
    status: 500
  });
  return {
    song: songResponse.data,
    artists: artistsResponse.data,
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? ""
  };
}
async function action$4({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: UpdateSongSchema
  });
  if (submission.status !== "success") return submission.reply();
  const {
    artistIds,
    ...body
  } = submission.value;
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const payload = {
    ...body,
    artistIds
  };
  const {
    data: data2,
    error
  } = await $fetch2(`/songs/${submission.value.id}`, {
    method: "PATCH",
    body: payload
  });
  if (!data2 || error) {
    return submission.reply({
      fieldErrors: {
        title: ["Failed to update song."]
      }
    });
  }
  return redirect(href("/songs/:slug", {
    slug: data2.slug
  }));
}
const songsSlugEdit = UNSAFE_withComponentProps(function SongSlugEdit({
  loaderData,
  actionData
}) {
  var _a;
  const {
    song,
    artists: artists2,
    uploadcarePublicKey
  } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: UpdateSongSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: song.id,
      imageUrl: song.imageUrl ?? "",
      title: song.title,
      artistIds: ((_a = song.artists) == null ? void 0 : _a.map((artist) => artist.id)) ?? [],
      spotifyUrl: song.spotifyUrl ?? ""
    }
  });
  const defaultOptions = artists2.map((artist) => ({
    value: artist.id,
    label: artist.name
  }));
  const controlArtistIds = useInputControl(fields.artistIds);
  const controlimageUrl = useInputControl(fields.imageUrl);
  const [artistOptions, setArtistOptions] = useState(defaultOptions.filter((opt) => {
    var _a2;
    return (_a2 = song.artists) == null ? void 0 : _a2.some((artists22) => artists22.id === opt.value);
  }));
  const handleChangeArtistOptions = (options) => {
    setArtistOptions(options);
    const artistIds = options.map((option) => option.value);
    controlArtistIds.change(artistIds);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "my-8",
    children: /* @__PURE__ */ jsxs(Form, {
      method: "post",
      ...getFormProps(form),
      className: "mr-4 ml-4",
      children: [/* @__PURE__ */ jsx("input", {
        ...getInputProps(fields.id, {
          type: "hidden"
        })
      }), /* @__PURE__ */ jsxs("label", {
        className: "mb-10 flex cursor-pointer flex-col items-center",
        htmlFor: fields.imageUrl.id,
        children: [/* @__PURE__ */ jsx(SingleFileUploader, {
          value: controlimageUrl.value,
          onChange: controlimageUrl.change,
          publicKey: uploadcarePublicKey
        }), /* @__PURE__ */ jsx("input", {
          ...getInputProps(fields.imageUrl, {
            type: "text"
          }),
          className: "hidden"
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "text-sm text-red-500",
        children: fields.imageUrl.errors
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-1",
          children: [/* @__PURE__ */ jsx(Input, {
            ...getInputProps(fields.title, {
              type: "text"
            }),
            placeholder: "Title",
            className: "border-zinc-700 bg-zinc-800"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-red-500",
            children: fields.title.errors
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-1",
          children: [/* @__PURE__ */ jsx(MultiselectArtists, {
            defaultOptions,
            artistOptions,
            handleChangeArtistOptions,
            id: "artist",
            placeholder: "Type artist name...",
            className: "border-zinc-700 bg-zinc-800"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-red-500",
            children: fields.artistIds.errors
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-1",
          children: [/* @__PURE__ */ jsx(Input, {
            ...getInputProps(fields.spotifyUrl, {
              type: "text"
            }),
            placeholder: "Spotify URL",
            className: "border-zinc-700 bg-zinc-800"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-red-500",
            children: fields.spotifyUrl.errors
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-14",
        children: /* @__PURE__ */ jsx(Button, {
          className: "w-full",
          disabled: isSubmitting,
          children: isSubmitting ? "Saving..." : "Save"
        })
      })]
    })
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: songsSlugEdit,
  loader: loader$6,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      className: cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = React.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      children
    }
  );
}
function MinimalTiptapEditor({
  content,
  onChange,
  autofocus = false,
  editable = true,
  name,
  className = "",
  editorContentClassName = "",
  id
}) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        hardBreak: false,
        paragraph: false
      }),
      Placeholder.configure({
        placeholder: () => {
          return "The the lyric here...";
        }
      }),
      HardBreak.configure({
        HTMLAttributes: {
          class: "line-break"
        },
        keepMarks: false
      }),
      Paragraph.configure({
        HTMLAttributes: { class: "paragraph" }
      })
    ],
    editable,
    autofocus,
    onUpdate({ editor: editor2 }) {
      onChange == null ? void 0 : onChange(editor2.getHTML());
    },
    immediatelyRender: false
  });
  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        editor.commands.setHardBreak();
      }
    };
    const dom = editor.view.dom;
    dom.addEventListener("keydown", handleKeyDown);
    return () => {
      dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `rounded-md border border-gray-700 bg-gray-800/50 ${className}`,
      children: [
        /* @__PURE__ */ jsxs(ToggleGroup, { type: "multiple", className: "border-b border-gray-700 p-2", children: [
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              "aria-pressed": editor == null ? void 0 : editor.isActive("bold"),
              onClick: () => editor == null ? void 0 : editor.chain().focus().toggleBold().run(),
              value: "bold",
              children: /* @__PURE__ */ jsx(Bold, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              "aria-pressed": editor == null ? void 0 : editor.isActive("italic"),
              onClick: () => editor == null ? void 0 : editor.chain().focus().toggleItalic().run(),
              value: "italic",
              children: /* @__PURE__ */ jsx(Italic, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              "aria-pressed": editor == null ? void 0 : editor.isActive("strike"),
              onClick: () => editor == null ? void 0 : editor.chain().focus().toggleStrike().run(),
              value: "strike",
              children: /* @__PURE__ */ jsx(Strikethrough, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            ToggleGroupItem,
            {
              onClick: () => editor == null ? void 0 : editor.chain().focus().setHardBreak().run(),
              value: "break-line",
              children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "↵" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: /* @__PURE__ */ jsx(
          EditorContent,
          {
            editor,
            className: cn(
              "min-h-[150px] bg-transparent p-4 focus:outline-none",
              editorContentClassName
            )
          }
        ) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "hidden",
            name,
            value: (editor == null ? void 0 : editor.getHTML()) ?? "",
            id
          }
        ),
        " "
      ]
    }
  );
}
function meta$5({}) {
  return [{
    title: "Lyrifix - Add Lyric"
  }];
}
async function loader$5({
  request,
  params
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const slug = params.slug;
  const {
    data: songData,
    error
  } = await $fetch2(`/songs/${slug}`);
  if (!songData || error) {
    throw new Response("Song not found", {
      status: 404
    });
  }
  return {
    songId: songData.id,
    slug
  };
}
async function action$3({
  request,
  params
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: CreateLyricSchema
  });
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const slug = params.slug;
  const $fetch2 = createAuthFetch(token);
  const {
    data: songData,
    error: songError
  } = await $fetch2(`/songs/${slug}`);
  if (songError || !songData) {
    console.error("Failed to fetch song:", songError);
    return submission.reply({
      fieldErrors: {
        text: ["Failed to fetch song."]
      }
    });
  }
  const songId = songData.id;
  const lyricPayload = {
    text: submission.value.text,
    songId
  };
  const {
    data: lyricData,
    error: lyricError
  } = await $fetch2("/lyrics", {
    method: "POST",
    body: lyricPayload
  });
  if (lyricError || !lyricData) {
    console.error("Failed to add lyric:", lyricError);
    return submission.reply({
      fieldErrors: {
        text: ["Failed to add lyric."]
      }
    });
  }
  return redirect(href("/songs/:slug", {
    slug
  }));
}
const songsSlugAddLyric = UNSAFE_withComponentProps(function SongsSlugAddLyric({
  actionData,
  loaderData
}) {
  var _a, _b;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: CreateLyricSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      text: "Type the lyric here...",
      songId: loaderData.songId,
      slug: loaderData.slug
    }
  });
  const controlText = useInputControl(fields.text);
  return /* @__PURE__ */ jsx("div", {
    className: "flex w-full items-center justify-center bg-zinc-950",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-lg pt-8 shadow-lg",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "mb-6 text-center text-xl font-bold text-white",
        children: "Add Lyric"
      }), /* @__PURE__ */ jsxs(Form, {
        method: "post",
        ...getFormProps(form),
        className: "flex flex-col gap-4",
        children: [/* @__PURE__ */ jsx("label", {
          hidden: true,
          htmlFor: fields.text.id,
          className: "mb-1 block text-sm font-medium text-zinc-200",
          children: "Lyric Text"
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MinimalTiptapEditor, {
            id: fields.text.id,
            name: fields.text.name,
            placeholder: "Type the lyric here...",
            content: controlText.value || "Type the lyric here...",
            onChange: (val) => {
              controlText.change(val);
            }
          })
        }), /* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: ((_a = fields.songId) == null ? void 0 : _a.name) || "songId",
          value: loaderData.songId
        }), /* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: ((_b = fields.slug) == null ? void 0 : _b.name) || "slug",
          value: loaderData.slug
        }), fields.text.errors && /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-sm text-red-500",
          children: fields.text.errors.join(", ")
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Button, {
            className: "w-full",
            disabled: isSubmitting,
            children: isSubmitting ? "Saving Lyric..." : "Save Lyric"
          })
        })]
      })]
    })
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: songsSlugAddLyric,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Lyrifix - Edit Lyric"
  }, {
    name: "description",
    content: "Edit Lyric"
  }];
}
async function loader$4({
  request,
  params
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const {
    slug,
    id
  } = params;
  try {
    const {
      data: songData
    } = await $fetch2(`/songs/${slug}`, {
      params: {
        slug
      }
    });
    if (!(songData == null ? void 0 : songData.lyrics) || songData.lyrics.length === 0) {
      throw new Response("No lyrics found for this song", {
        status: 404
      });
    }
    const targetLyric = songData.lyrics.find((lyric) => lyric.id === id);
    if (!targetLyric) {
      throw new Response("Lyric not found", {
        status: 404
      });
    }
    return {
      lyric: targetLyric,
      slug
    };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Lyric not found", {
      status: 404
    });
  }
}
async function action$2({
  request,
  params
}) {
  var _a;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: UpdateLyricSchema
  });
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const payload = {
    ...submission.value,
    userId
  };
  const {
    data: lyric,
    error
  } = await $fetch2(`/lyrics/${submission.value.id}`, {
    method: "PATCH",
    body: payload
  });
  if (!lyric || error) {
    return submission.reply({
      fieldErrors: {
        name: ["Failed to update lyric."]
      }
    });
  }
  return redirect(`/songs/${params.slug}?lyric=${(_a = lyric.user) == null ? void 0 : _a.username}`);
}
const songsSlugEditLyric = UNSAFE_withComponentProps(function LyricsSlugEditRoute({
  actionData,
  loaderData
}) {
  const lyric = loaderData.lyric;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: UpdateLyricSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: lyric.id || "",
      text: lyric.text || ""
    }
  });
  const [editorText, setEditorText] = useState(lyric.text || "");
  return /* @__PURE__ */ jsx("div", {
    className: "flex w-full items-center justify-center bg-zinc-950",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-lg pt-8 shadow-lg",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "mb-6 text-center text-xl font-bold text-white",
        children: "Edit Lyric"
      }), /* @__PURE__ */ jsxs(Form, {
        method: "patch",
        ...getFormProps(form),
        className: "flex flex-col gap-4",
        children: [/* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "id",
          value: lyric.id || ""
        }), /* @__PURE__ */ jsx("label", {
          hidden: true,
          htmlFor: fields.text.id,
          className: "mb-1 block text-sm font-medium text-zinc-200",
          children: "Lyric Text"
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(MinimalTiptapEditor, {
            id: fields.text.id,
            name: fields.text.name,
            content: editorText,
            onChange: (val) => {
              setEditorText(val);
            }
          })
        }), fields.text.errors && /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-sm text-red-500",
          children: fields.text.errors.join(", ")
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Button, {
            className: "w-full",
            disabled: isSubmitting,
            children: isSubmitting ? "Saving Lyric..." : "Save Lyric"
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx(Button, {
            className: "w-full",
            variant: "outline",
            asChild: true,
            children: /* @__PURE__ */ jsx(Link, {
              to: `/songs/${loaderData.slug}`,
              children: "Cancel"
            })
          })
        })]
      })]
    })
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: songsSlugEditLyric,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "Artists - Lyrifix"
  }, {
    name: "description",
    content: "Discover artists and their music on Lyrifix."
  }];
}
async function loader$3() {
  const {
    data: artists2
  } = await $fetch("/artists");
  return {
    artists: artists2
  };
}
const artists = UNSAFE_withComponentProps(function ArtistRoute({
  loaderData
}) {
  const {
    artists: artists2
  } = loaderData;
  if (!artists2) return null;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6 text-white",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: "Artists"
        })
      })
    }), /* @__PURE__ */ jsx("ul", {
      className: "grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-2",
      children: artists2.map((artists22) => /* @__PURE__ */ jsx("li", {
        className: "flex h-full flex-col transition-all duration-200 hover:scale-105",
        children: /* @__PURE__ */ jsx(Link, {
          to: `/artists/${artists22.slug}`,
          className: "flex h-full flex-1 flex-col",
          children: /* @__PURE__ */ jsxs(Card, {
            className: "bg-card flex h-full flex-1 flex-col items-center rounded-3xl border-2 border-fuchsia-500 p-4 text-center break-words text-white shadow-lg",
            children: [/* @__PURE__ */ jsx("img", {
              src: artists22.imageUrl || "https://placehold.co/500x500/EEE/31343C",
              alt: artists22.name,
              className: "aspect-square h-40 w-40 rounded-full bg-zinc-800 object-cover"
            }), /* @__PURE__ */ jsx(CardContent, {
              children: /* @__PURE__ */ jsx(CardTitle, {
                className: "w-full max-w-xs text-center break-words",
                children: artists22.name
              })
            })]
          }, artists22.id)
        })
      }, artists22.id))
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: artists,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({
  data: data2
}) {
  const artist = data2 == null ? void 0 : data2.artist;
  if (!artist) return [{
    title: `Artist not found - Lyrifix`
  }];
  return [{
    title: `${artist.name} - Lyrifix`
  }];
}
async function loader$2({
  request,
  params
}) {
  const {
    slug
  } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  session.get("user");
  const {
    data: artist,
    error
  } = await $fetch(`/artists/${slug}`, {
    params: {
      slug
    }
  });
  if (error) throw new Response("Artist not found", {
    status: 404
  });
  return {
    artist,
    isAuthenticated
  };
}
const artistSlug = UNSAFE_withComponentProps(function ArtistSlugRoute({
  loaderData
}) {
  var _a;
  const {
    artist,
    isAuthenticated
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col pt-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row sm:items-center sm:space-x-4",
      children: [/* @__PURE__ */ jsx("img", {
        src: artist.imageUrl ?? "https://placehold.co/500x500/EEE/31343C",
        alt: artist.name,
        className: "h-40 w-40 rounded-xl object-cover shadow-md"
      }), /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: artist.name
        })
      }), /* @__PURE__ */ jsx("div", {
        children: isAuthenticated && /* @__PURE__ */ jsx(Button, {
          asChild: true,
          size: "sm",
          children: /* @__PURE__ */ jsx(Link, {
            to: href("/artists/:slug/edit", {
              slug: artist.slug
            }),
            children: "Edit Artist"
          })
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col space-y-4 px-8 py-4",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "mt-8 mb-4 text-2xl font-semibold",
        children: "Songs"
      }), /* @__PURE__ */ jsx("div", {
        className: "space-y-4",
        children: (_a = artist.songs) == null ? void 0 : _a.map((song, i) => /* @__PURE__ */ jsxs(Link, {
          to: `/songs/${song.slug}`,
          className: "hover:bg-card flex items-center space-x-4 rounded-md border-2 border-fuchsia-500 p-2 transition-all duration-200 hover:scale-105",
          children: [/* @__PURE__ */ jsx("img", {
            src: song.imageUrl ?? "https://placehold.co/500x500/EEE/31343C",
            alt: song.title,
            className: "h-12 w-12 rounded-md object-cover"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col",
            children: [/* @__PURE__ */ jsx("span", {
              className: "leading-tight font-medium",
              children: song.title
            }), /* @__PURE__ */ jsx("span", {
              className: "text-muted-foreground text-sm",
              children: artist.name
            })]
          })]
        }, song.id))
      })]
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: artistSlug,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Add New Artists - Lyrifix"
  }, {
    name: "description",
    content: "Discover artists and their music on Lyrifix."
  }];
}
async function loader$1({
  request
}) {
  return {
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? ""
  };
}
async function action$1({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: CreateArtistSchema
  });
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const payload = {
    ...submission.value,
    userId
  };
  const {
    data: artist,
    error
  } = await $fetch2("/artists", {
    method: "POST",
    body: payload
  });
  if (!artist || error) {
    return submission.reply({
      fieldErrors: {
        name: ["Failed to add artist."]
      }
    });
  }
  return redirect(href("/artists/:slug", {
    slug: artist.slug
  }));
}
const addArtist = UNSAFE_withComponentProps(function AddArtistRoute({
  actionData,
  loaderData
}) {
  const {
    uploadcarePublicKey
  } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: CreateArtistSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      name: "",
      imageUrl: ""
    }
  });
  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col items-center pt-10",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "w-xs",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          className: "text-center font-bold",
          children: "Add New Artist"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          ...getFormProps(form),
          className: "mr-4 ml-4 space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: fields.name.id,
              children: "Artist Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...getInputProps(fields.name, {
                type: "text"
              }),
              placeholder: "Artist Name",
              className: "border-zinc-700 bg-zinc-800"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.name.errors
            })]
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsxs("label", {
              className: "flex cursor-pointer flex-col items-center",
              htmlFor: fields.imageUrl.id,
              children: [/* @__PURE__ */ jsx(SingleFileUploader, {
                value: imageUrl,
                onChange: setImageUrl,
                publicKey: uploadcarePublicKey
              }), /* @__PURE__ */ jsx("input", {
                ...getInputProps(fields.imageUrl, {
                  type: "text"
                }),
                value: imageUrl,
                readOnly: true,
                className: "hidden"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(Button, {
              className: "w-full",
              disabled: isSubmitting,
              children: isSubmitting ? "Saving Artist..." : "Save Artist"
            })
          })]
        })
      })]
    })
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: addArtist,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Lyrifix - Edit Artist"
  }, {
    name: "description",
    content: "Edit Artist"
  }];
}
async function loader({
  params
}) {
  const {
    slug
  } = params;
  const artistResponse = await $fetch("/artists/:slug", {
    params: {
      slug
    }
  });
  if (artistResponse.error) throw new Response("Artist not found", {
    status: 404
  });
  return {
    artist: artistResponse.data,
    uploadcarePublicKey: process.env.VITE_UPLOADCARE_PUBLIC_KEY ?? ""
  };
}
async function action({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: UpdateArtistSchema
  });
  if (submission.status !== "success") return submission.reply();
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const user = session.get("user");
  const userId = user == null ? void 0 : user.id;
  if (!token || !userId) return redirect("/login");
  const $fetch2 = createAuthFetch(token);
  const payload = {
    ...submission.value,
    userId
  };
  const {
    data: data2,
    error
  } = await $fetch2(`/artists/${submission.value.id}`, {
    method: "PATCH",
    body: payload
  });
  if (!data2 || error) {
    return submission.reply({
      fieldErrors: {
        name: ["Failed to update artist."]
      }
    });
  }
  return redirect(href("/artists"));
}
const artistsSlugEdit = UNSAFE_withComponentProps(function ArtistsSlugEditRoute({
  actionData,
  loaderData
}) {
  const {
    artist,
    uploadcarePublicKey
  } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [form, fields] = useForm({
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: UpdateArtistSchema
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
    defaultValue: {
      id: artist.id,
      name: artist.name,
      imageUrl: artist.imageUrl
    }
  });
  const [imageUrl, setImageUrl] = useState(fields.imageUrl.initialValue ?? "");
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col items-center pt-10",
    children: /* @__PURE__ */ jsxs(Card, {
      className: "w-xs",
      children: [/* @__PURE__ */ jsx(CardHeader, {
        children: /* @__PURE__ */ jsx(CardTitle, {
          className: "text-center font-bold",
          children: "Edit Artist"
        })
      }), /* @__PURE__ */ jsx(CardContent, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "post",
          ...getFormProps(form),
          className: "mr-4 ml-4 space-y-4",
          children: [/* @__PURE__ */ jsx("input", {
            ...getInputProps(fields.id, {
              type: "hidden"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: fields.name.id,
              children: "Artist Name"
            }), /* @__PURE__ */ jsx(Input, {
              ...getInputProps(fields.name, {
                type: "text"
              }),
              placeholder: "Artist Name",
              className: "border-zinc-700 bg-zinc-800"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-red-500",
              children: fields.name.errors
            })]
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsxs("label", {
              className: "flex cursor-pointer flex-col items-center",
              htmlFor: fields.imageUrl.id,
              children: [/* @__PURE__ */ jsx(SingleFileUploader, {
                value: imageUrl,
                onChange: setImageUrl,
                publicKey: uploadcarePublicKey
              }), /* @__PURE__ */ jsx("input", {
                ...getInputProps(fields.imageUrl, {
                  type: "text"
                }),
                value: imageUrl,
                readOnly: true,
                className: "hidden"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx(Button, {
              className: "w-full",
              disabled: isSubmitting,
              children: isSubmitting ? "Saving Artist..." : "Save Artist"
            })
          })]
        })
      })]
    })
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: artistsSlugEdit,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C35mMJOz.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/index-B3T0X-bt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DMsHLBgF.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/index-B3T0X-bt.js"], "css": ["/assets/root-BRxp_sOb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "layouts/layout": { "id": "layouts/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/layout-BP6mz043.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/input-xm3ORQld.js", "/assets/utils-bRKmu4jq.js", "/assets/createLucideIcon-8xFrFlUl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "layouts/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DyE47B5d.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/song-card-CC3heBi3.js", "/assets/card-CW33uc-b.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/search": { "id": "routes/search", "parentId": "layouts/layout", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/search-CKPGlURL.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/song-card-CC3heBi3.js", "/assets/card-CW33uc-b.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/song-slug": { "id": "routes/song-slug", "parentId": "layouts/layout", "path": "songs/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/song-slug-CSwIYfUQ.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/index-Beh6w4kb.js", "/assets/index-Vg_Lyc_r.js", "/assets/utils-bRKmu4jq.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/index-B3T0X-bt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/register": { "id": "routes/register", "parentId": "layouts/layout", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/register-kpc-SrcN.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/input-xm3ORQld.js", "/assets/label-D3N-KwjU.js", "/assets/card-CW33uc-b.js", "/assets/auth-DD4n2oA4.js", "/assets/button-DLC1agRu.js", "/assets/hooks-PJGK5Pe1.js", "/assets/utils-bRKmu4jq.js", "/assets/index-Vg_Lyc_r.js", "/assets/index-B3T0X-bt.js", "/assets/createLucideIcon-8xFrFlUl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "layouts/layout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-Cj0Gtfyo.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/input-xm3ORQld.js", "/assets/label-D3N-KwjU.js", "/assets/card-CW33uc-b.js", "/assets/auth-DD4n2oA4.js", "/assets/hooks-PJGK5Pe1.js", "/assets/utils-bRKmu4jq.js", "/assets/index-Vg_Lyc_r.js", "/assets/index-B3T0X-bt.js", "/assets/createLucideIcon-8xFrFlUl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/logout": { "id": "routes/logout", "parentId": "layouts/layout", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/logout-Cdgr20hE.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/library": { "id": "routes/library", "parentId": "layouts/layout", "path": "library", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/library-CALQOQJV.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/song-card-CC3heBi3.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/plus-B6sc4GmR.js", "/assets/utils-bRKmu4jq.js", "/assets/card-CW33uc-b.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/library-artist": { "id": "routes/library-artist", "parentId": "layouts/layout", "path": "library-artist", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/library-artist-BpyGDkjF.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/card-CW33uc-b.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/plus-B6sc4GmR.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/library-lyric": { "id": "routes/library-lyric", "parentId": "layouts/layout", "path": "library-lyric", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/library-lyric-CKGLYikf.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/song-card-CC3heBi3.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/plus-B6sc4GmR.js", "/assets/utils-bRKmu4jq.js", "/assets/card-CW33uc-b.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/add-song": { "id": "routes/add-song", "parentId": "layouts/layout", "path": "add-song", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/add-song-fOnGZg2R.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/song-ByDppcAO.js", "/assets/artist-C-xmUNrL.js", "/assets/button-DLC1agRu.js", "/assets/card-CW33uc-b.js", "/assets/input-xm3ORQld.js", "/assets/label-D3N-KwjU.js", "/assets/utils-bRKmu4jq.js", "/assets/hooks-PJGK5Pe1.js", "/assets/integrations-Cf1gwroS.js", "/assets/helpers-CZocgdl2.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/index-B3T0X-bt.js", "/assets/lyric-DRC73VJJ.js", "/assets/index-Vg_Lyc_r.js"], "css": ["/assets/artist-BFxJUhRb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/songs-slug-edit": { "id": "routes/songs-slug-edit", "parentId": "layouts/layout", "path": "songs/:slug/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/songs-slug-edit-CUNZGEMj.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/song-ByDppcAO.js", "/assets/artist-C-xmUNrL.js", "/assets/input-xm3ORQld.js", "/assets/button-DLC1agRu.js", "/assets/hooks-PJGK5Pe1.js", "/assets/integrations-Cf1gwroS.js", "/assets/helpers-CZocgdl2.js", "/assets/index-B3T0X-bt.js", "/assets/utils-bRKmu4jq.js", "/assets/createLucideIcon-8xFrFlUl.js", "/assets/lyric-DRC73VJJ.js"], "css": ["/assets/artist-BFxJUhRb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/songs-slug-add-lyric": { "id": "routes/songs-slug-add-lyric", "parentId": "layouts/layout", "path": "songs/:slug/add-lyric", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/songs-slug-add-lyric-Bw7qvqcc.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/minimal-tiptap-editor-qoyF4lrc.js", "/assets/button-DLC1agRu.js", "/assets/lyric-DRC73VJJ.js", "/assets/hooks-PJGK5Pe1.js", "/assets/integrations-Cf1gwroS.js", "/assets/helpers-CZocgdl2.js", "/assets/index-B3T0X-bt.js", "/assets/index-Beh6w4kb.js", "/assets/utils-bRKmu4jq.js", "/assets/createLucideIcon-8xFrFlUl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/songs-slug-edit-lyric": { "id": "routes/songs-slug-edit-lyric", "parentId": "layouts/layout", "path": "songs/:slug/lyrics/:id/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/songs-slug-edit-lyric-DDO_cdrZ.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/minimal-tiptap-editor-qoyF4lrc.js", "/assets/button-DLC1agRu.js", "/assets/lyric-DRC73VJJ.js", "/assets/hooks-PJGK5Pe1.js", "/assets/helpers-CZocgdl2.js", "/assets/index-B3T0X-bt.js", "/assets/index-Beh6w4kb.js", "/assets/utils-bRKmu4jq.js", "/assets/createLucideIcon-8xFrFlUl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/artists": { "id": "routes/artists", "parentId": "layouts/layout", "path": "artists", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/artists-DyDf4oi0.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/card-CW33uc-b.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/artist-slug": { "id": "routes/artist-slug", "parentId": "layouts/layout", "path": "artists/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/artist-slug-CXRdU1hX.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/button-DLC1agRu.js", "/assets/utils-bRKmu4jq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/add-artist": { "id": "routes/add-artist", "parentId": "layouts/layout", "path": "add-artist", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/add-artist-CGrVJAxb.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/card-CW33uc-b.js", "/assets/label-D3N-KwjU.js", "/assets/input-xm3ORQld.js", "/assets/button-DLC1agRu.js", "/assets/artist-C-xmUNrL.js", "/assets/hooks-PJGK5Pe1.js", "/assets/helpers-CZocgdl2.js", "/assets/utils-bRKmu4jq.js", "/assets/index-Vg_Lyc_r.js", "/assets/index-B3T0X-bt.js"], "css": ["/assets/artist-BFxJUhRb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/artists-slug-edit": { "id": "routes/artists-slug-edit", "parentId": "layouts/layout", "path": "artists/:slug/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/artists-slug-edit-IzkPOQMM.js", "imports": ["/assets/chunk-NL6KNZEE-CxvR8bn4.js", "/assets/artist-C-xmUNrL.js", "/assets/card-CW33uc-b.js", "/assets/label-D3N-KwjU.js", "/assets/input-xm3ORQld.js", "/assets/button-DLC1agRu.js", "/assets/hooks-PJGK5Pe1.js", "/assets/helpers-CZocgdl2.js", "/assets/utils-bRKmu4jq.js", "/assets/index-Vg_Lyc_r.js", "/assets/index-B3T0X-bt.js"], "css": ["/assets/artist-BFxJUhRb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-50e571ef.js", "version": "50e571ef", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layouts/layout": {
    id: "layouts/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "layouts/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/search": {
    id: "routes/search",
    parentId: "layouts/layout",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/song-slug": {
    id: "routes/song-slug",
    parentId: "layouts/layout",
    path: "songs/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/register": {
    id: "routes/register",
    parentId: "layouts/layout",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/login": {
    id: "routes/login",
    parentId: "layouts/layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "layouts/layout",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/library": {
    id: "routes/library",
    parentId: "layouts/layout",
    path: "library",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/library-artist": {
    id: "routes/library-artist",
    parentId: "layouts/layout",
    path: "library-artist",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/library-lyric": {
    id: "routes/library-lyric",
    parentId: "layouts/layout",
    path: "library-lyric",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/add-song": {
    id: "routes/add-song",
    parentId: "layouts/layout",
    path: "add-song",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/songs-slug-edit": {
    id: "routes/songs-slug-edit",
    parentId: "layouts/layout",
    path: "songs/:slug/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/songs-slug-add-lyric": {
    id: "routes/songs-slug-add-lyric",
    parentId: "layouts/layout",
    path: "songs/:slug/add-lyric",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/songs-slug-edit-lyric": {
    id: "routes/songs-slug-edit-lyric",
    parentId: "layouts/layout",
    path: "songs/:slug/lyrics/:id/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/artists": {
    id: "routes/artists",
    parentId: "layouts/layout",
    path: "artists",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/artist-slug": {
    id: "routes/artist-slug",
    parentId: "layouts/layout",
    path: "artists/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/add-artist": {
    id: "routes/add-artist",
    parentId: "layouts/layout",
    path: "add-artist",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/artists-slug-edit": {
    id: "routes/artists-slug-edit",
    parentId: "layouts/layout",
    path: "artists/:slug/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  }
};
const build = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
const _virtual_netlifyServer = createRequestHandler({
  build,
  getLoadContext: async (_req, ctx) => ctx
});
export {
  _virtual_netlifyServer as default
};
