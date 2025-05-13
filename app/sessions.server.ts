import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      maxAge: 604800, // 7 days in seconds
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [String(process.env.COOKIE_SECRET_KEY)],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
