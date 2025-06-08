import { HomeIcon, UserIcon, CircleGaugeIcon, PaletteIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import type { User } from "~/schemas/user";

interface BottomNavbarProps {
  isAuthenticated?: boolean;
  user?: User;
}

export const BottomNavbar = ({ isAuthenticated, user }: BottomNavbarProps) => {
  const location = useLocation();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white">
      <div className="flex items-center justify-around py-3">
        {/* TODO: Use NavLink built-in way to detect location */}
        <NavLink
          to="/"
          className={`flex flex-col items-center px-8 ${
            location.pathname === "/" ? "text-fuchsia-400" : ""
          }`}
        >
          <HomeIcon className="mb-1 h-6 w-6" />
          <span className="text-sm">Home</span>
        </NavLink>

        <NavLink
          to="/artists"
          className={`flex flex-col items-center ${
            location.pathname === "/artists" ? "text-fuchsia-400" : ""
          }`}
        >
          <PaletteIcon className="mb-1 h-6 w-6" />
          <span className="text-sm">Artists</span>
        </NavLink>

        {isAuthenticated && user && (
          <NavLink
            to="/library"
            className={`flex flex-col items-center px-8 ${
              location.pathname.startsWith("/library") ||
              location.pathname === "/add-song"
                ? "text-fuchsia-400"
                : ""
            }`}
          >
            <CircleGaugeIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Your Library</span>
          </NavLink>
        )}

        {isAuthenticated && user && (
          <NavLink
            to="/logout"
            className={`flex flex-col items-center px-8 ${
              location.pathname === "/logout" ? "text-fuchsia-400" : ""
            }`}
          >
            <UserIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Logout</span>
          </NavLink>
        )}

        {!isAuthenticated && !user && (
          <NavLink
            to="/login"
            className={`flex flex-col items-center px-8 ${
              location.pathname.startsWith("/login") ||
              location.pathname.startsWith("/register")
                ? "text-fuchsia-400"
                : ""
            }`}
          >
            <UserIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
