import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { BottomNavbar } from "~/components/bottom-navbar";

export default function Layout() {
  return (
    <>
      <div className="no-scrollbar bg-background relative mx-auto min-h-screen max-w-[500px] overflow-auto">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-6 md:px-8">
          <Outlet />
        </div>
        <BottomNavbar />
      </div>
    </>
  );
}
