import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/dashboard";
import { Link, redirect } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { PlusIcon } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");
  console.info("dashboard:token", token);

  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    session.flash("error", "Failed to check user");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const userData = await response.json();
  console.info({ userData });

  return userData;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Your Library</h1>
      <p className="mb-4 text-lg">Welcome back, {loaderData.fullName}!</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card className="flex flex-col items-center justify-center gap-4 p-6 text-white">
          <Link to="/add-song" className="h-full w-full">
            <CardContent className="flex h-full flex-col items-center justify-center">
              <PlusIcon className="h-12 w-12 text-gray-300" />
              <span className="mt-2 text-sm font-medium text-white">Add</span>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
