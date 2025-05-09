import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { BottomNavbar } from "~/components/bottom-navbar";

export default function Layout() {
  return (
    <div className="bg-background no-scrollbar relative mx-auto min-h-screen max-w-[500px] overflow-auto">
      <Header />

      <div className="mx-auto max-w-screen-xl px-4 pb-28 sm:px-6 md:px-8">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2">
        <BottomNavbar />
      </div>
    </div>
  );
}
