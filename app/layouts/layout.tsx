import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { BottomNavbar } from "~/components/bottom-navbar";

export default function Layout() {
  return (
    <div className="bg-background no-scrollbar fixed relative mx-auto min-h-screen w-full max-w-[500px] overflow-auto">
      <div className="fixed top-0 left-1/2 z-10 w-full max-w-[500px] -translate-x-1/2">
        <Header />
      </div>

      <div className="px-4 pt-16 pb-28 sm:px-6 md:px-8">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2">
        <BottomNavbar />
      </div>
    </div>
  );
}
