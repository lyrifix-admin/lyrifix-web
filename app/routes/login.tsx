import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import type { Route } from "./+types/login";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { LoginSchema } from "~/modules/login/schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Lyrifix" },
    {
      name: "description",
      content: "Login to Lyrifix. Fix the lyric, Feel the music.",
    },
  ];
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: LoginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(formData);
  return redirect("/dashboard");
}

export default function LoginRoute({ actionData }: Route.ComponentProps) {
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Form
        method="post"
        action="/login"
        id="{form.id}"
        onSubmit={form.onSubmit}
      >
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mr-4 ml-4 grid grid-cols-1 gap-4">
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
                  placeholder="Enter your password"
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </Form>
      <div className="mt-4 text-sm text-white">
        Do not have an account?{" "}
        <a href="/register" className="text-fuchsia-500 hover:underline">
          Register here
        </a>
      </div>
    </div>
  );
}
