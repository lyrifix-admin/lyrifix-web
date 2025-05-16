import { Outlet, useLoaderData } from "react-router";
import { Header } from "~/components/header";
import { BottomNavbar } from "~/components/bottom-navbar";
import type { Route } from "../+types/root";
import { getSession } from "~/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return null;
  }

  const token = session.get("token");

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const userData = await response.json();
  return userData;
}

export default function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="bg-background no-scrollbar fixed relative mx-auto min-h-screen w-full max-w-[500px] overflow-auto">
      <div className="fixed top-0 left-1/2 z-10 w-full max-w-[500px] -translate-x-1/2">
        <Header />
      </div>

      <div className="px-4 pt-16 pb-28 sm:px-6 md:px-8">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2">
        <BottomNavbar user={user} />
      </div>
    </div>
  );
}
