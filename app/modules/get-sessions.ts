import { getSession } from "~/sessions.server";

export async function getSessions(cookies: string) {
  const session = await getSession(cookies);
  const token = session.get("token");
  const user = session.get("user");

  return { token, user, session };
}
