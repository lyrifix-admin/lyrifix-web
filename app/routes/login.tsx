import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function LoginRoute() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Login Lyrifix</h1>
      <Form
        method="post"
        action="/login"
        className="bg-card w-full max-w-sm rounded p-6 shadow-md"
      >
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </Label>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded bg-fuchsia-600 py-2 text-white transition duration-200 hover:bg-fuchsia-700"
        >
          Login
        </Button>
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
