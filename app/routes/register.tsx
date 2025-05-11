import type { Route } from "./+types/register";
import { Form } from "react-router";
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register Lyrifix" },
    {
      name: "description",
      content: "Register to Lyrifix. Fix the lyric, Feel the music.",
    },
  ];
}

export default function RegisterRoute() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Form method="post" action="/register" id="register">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center font-bold">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mr-4 ml-4 grid grid-cols-1 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" placeholder="user@example.com" />
              </div>

              <div className="relative flex min-h-[72px] flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Xsaeq3rt4s!!"
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full">Register</Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
