import type { Route } from "./+types/register";
import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RegisterSchema } from "~/schemas/auth";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register Lyrifix" },
    {
      name: "description",
      content: "Register to Lyrifix. Fix the lyric, Feel the music.",
    },
  ];
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: RegisterSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });
  if (!response.ok) {
    return null;
  }
  const registerResponse = await response.json();
  console.log(registerResponse);
  return redirect("/login");
}

export default function RegisterRoute({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: RegisterSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center pt-10">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center font-bold">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <Form
            method="post"
            action="/register"
            className="mr-4 ml-4 grid grid-cols-1 gap-4"
            onSubmit={form.onSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                key={fields.fullName.key}
                name={fields.fullName.name}
                id="fullName"
                placeholder="John Doe"
              />
              <p className="text-sm text-red-500">{fields.fullName.errors}</p>
            </div>
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

            <Button className="flex-1">Register</Button>
          </Form>
        </CardContent>
      </Card>

      <section className="mt-4 text-sm text-white">
        Already have an account?{" "}
        <a href="/login" className="text-fuchsia-500 hover:underline">
          Login here
        </a>
      </section>
    </div>
  );
}
