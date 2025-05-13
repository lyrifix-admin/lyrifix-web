import { Button } from "~/components/ui/button";
import { getSession, destroySession } from "../sessions.server";
import type { Route } from "./+types/logout";
import { Form, redirect, Link } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  return (
    <>
      <h1 className="text-md">Are you sure you want to log out?</h1>
      <Form method="post" className="mr-4 ml-4 grid grid-cols-1 gap-4">
        <Button className="text-md mt-4 flex-1">Logout</Button>
      </Form>
      <Link
        to="/"
        className="bg-card y-4 mt-4 flex h-9 flex-1 items-center justify-center rounded-md"
      >
        Never mind
      </Link>
    </>
  );
}
