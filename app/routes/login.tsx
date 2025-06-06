import { data, Form, href, redirect, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import type { Route } from "./+types/login";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { LoginSchema } from "~/schemas/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { commitSession, getSession } from "~/sessions.server";
import { $fetch } from "~/lib/fetch";
import type { paths } from "~/schema";

type SuccessResponse =
  paths["/auth/login"]["post"]["responses"][200]["content"]["application/json"];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login to Lyrifix" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(href("/library"));
  }

  // console.log("token:", session.get("token"));

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export async function action({ request }: Route.ClientActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: LoginSchema });
  if (submission.status !== "success") return submission.reply();

  const { data, error } = await $fetch<SuccessResponse>("/auth/login", {
    method: "POST",
    body: submission.value,
  });

  if (!data || error) {
    return submission.reply({
      fieldErrors: { email: ["Failed to login, try again."] },
    });
  }

  session.set("token", data.token);

  return redirect(href("/library"), {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form
            method="post"
            action="/login"
            className="mr-4 ml-4 grid grid-cols-1 gap-4"
            onSubmit={form.onSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                key={fields.email.key}
                name={fields.email.name}
                id="email"
                placeholder="user@example.com"
              />
              <p className="text-sm text-red-500">{fields.email.errors}</p>
            </div>

            <div className="relative flex min-h-[72px] flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                key={fields.password.key}
                name={fields.password.name}
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fields.password.errors?.map((error, index) => (
              <li key={index} className="text-sm text-red-500">
                {error}
              </li>
            ))}

            <Button className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </CardContent>
      </Card>

      <section className="mt-4 text-sm text-white">
        Do not have an account?{" "}
        <a href="/register" className="text-fuchsia-500 hover:underline">
          Register here
        </a>
      </section>
    </div>
  );
}
