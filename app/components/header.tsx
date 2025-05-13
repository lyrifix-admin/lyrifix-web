import { Input } from "~/components/ui/input";
import { Form } from "react-router";

export function Header() {
  return (
    <header className="bg-background flex h-16 items-center justify-between px-4">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/images/lyrifix-dark.png"
          alt="logo"
          className="h-8 w-24 max-w-[120px] min-w-[50px] rounded-md"
        />
      </a>

      {/* <a href="/dashboard" className="text-white hover:underline">
        Dashboard
      </a> */}

      <div className="flex flex-row items-center">
        <Form method="get" action="/search" className="">
          <Input
            name="q"
            placeholder="Search for songs..."
            className="min-w-2xs"
          />
        </Form>
      </div>
    </header>
  );
}
