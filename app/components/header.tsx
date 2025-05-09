import { Input } from "~/components/ui/input";
import { Form } from "react-router";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 flex-row items-center justify-between p-4">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/images/lyrifix-dark.png"
          alt="logo"
          className="h-16 w-24 max-w-[120px] min-w-[50px] rounded-md"
        />
      </a>
      <div className="absolute left-1/2 ml-8 flex -translate-x-1/2 flex-row items-center">
        <Form method="get" action="/search">
          <Input
            name="q"
            placeholder="Search for songs..."
            className="w-[300px] rounded-md border-2 border-fuchsia-950 p-2 pl-4"
          />
        </Form>
      </div>
    </header>
  );
}
