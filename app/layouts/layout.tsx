import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { BottomNavbar } from "~/components/bottom-navbar";
import type { Route } from "./+types/layout";
import { getSession } from "~/sessions.server";
import type { paths } from "~/schema";

type SuccessResponse =
  paths["/auth/me"]["get"]["responses"][200]["content"]["application/json"];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");
  if (!isAuthenticated) return { isAuthenticated };

  const token = session.get("token");
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return { isAuthenticated: false };

  const user: SuccessResponse = await response.json();

  session.set("user", user);

  return { isAuthenticated: true, user };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { isAuthenticated, user } = loaderData;

  return (
    <div className="bg-background no-scrollbar relative mx-auto min-h-screen w-full max-w-[500px] overflow-auto">
      <div className="fixed top-0 left-1/2 z-10 w-full max-w-[500px] -translate-x-1/2">
        <Header />
      </div>

      <div className="px-4 pt-16 pb-28 sm:px-6 md:px-8">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2">
        <BottomNavbar isAuthenticated={isAuthenticated} user={user} />
      </div>
    </div>
  );
}
