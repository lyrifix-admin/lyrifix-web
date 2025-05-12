import type { Route } from "./+types/register";
import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RegisterSchema } from "~/modules/login/schema";
import { parseWithZod } from "@conform-to/zod";
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
  // TODO: Login to API

  return redirect("/login");
}

export default function RegisterRoute() {
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
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input name="fullName" id="fullName" placeholder="John Doe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" placeholder="user@example.com" />
            </div>

            <div className="relative flex min-h-[72px] flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
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
