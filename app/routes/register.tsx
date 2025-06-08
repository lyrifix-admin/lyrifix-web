import type { Route } from "./+types/register";
import { Form, redirect, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RegisterSchema } from "~/schemas/auth";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Button } from "~/components/ui/button";
import { $fetch } from "~/lib/fetch";

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

  console.log({ submission });

  if (submission.status !== "success") return submission.reply();

  const { data, error } = await $fetch("/auth/register", {
    method: "POST",
    body: submission.value,
  });

  console.log(JSON.stringify(error, null, 2));

  if (!data || error) return submission.reply();

  return redirect("/login");
}

export default function RegisterRoute({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
                defaultValue={fields.fullName.initialValue}
              />
              <p className="text-sm text-red-500">{fields.fullName.errors}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullName">Username</Label>
              <Input
                key={fields.username.key}
                name={fields.username.name}
                id="username"
                placeholder="john"
                defaultValue={fields.username.initialValue}
              />
              <p className="text-sm text-red-500">{fields.username.errors}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                key={fields.email.key}
                name={fields.email.name}
                id="email"
                placeholder="user@example.com"
                defaultValue={fields.email.initialValue}
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
                defaultValue={fields.password.initialValue}
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
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
