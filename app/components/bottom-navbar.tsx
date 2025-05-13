import { Home, User, Palette, CircleGauge } from "lucide-react";
import { Link, useLocation } from "react-router";
// import { useState } from "react";

export const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white">
      <div className="flex items-center justify-around py-3">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            location.pathname === "/" ? "text-fuchsia-400" : ""
          }`}
        >
          <Home className="mb-1 h-6 w-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          to="/artist"
          className={`flex flex-col items-center ${
            location.pathname === "/artist" ? "text-fuchsia-400" : ""
          }`}
        >
          <Palette className="mb-1 h-6 w-6" />
          <span className="text-sm">Artist</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center ${
            location.pathname === "/dashboard" ? "text-fuchsia-400" : ""
          }`}
        >
          <CircleGauge className="mb-1 h-6 w-6" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          to="/login"
          className={`flex flex-col items-center ${
            location.pathname.startsWith("/login") ||
            location.pathname.startsWith("/register") ||
            location.pathname === "/logout"
              ? "text-fuchsia-400"
              : ""
          }`}
        >
          <User className="mb-1 h-6 w-6" />
          <span className="text-sm">User</span>
        </Link>
      </div>
    </nav>
  );
};
