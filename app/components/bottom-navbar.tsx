import { Home, User, Palette, CircleGauge } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export const BottomNavbar = () => {
  const [activePath, setActivePath] = useState("/");

  const handleNavigation = (path: string) => {
    setActivePath(path);
  };
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white">
      <div className="flex items-center justify-around py-3">
        <Link
          to="/"
          onClick={() => handleNavigation("/")}
          className={`flex flex-col items-center ${
            activePath === "/" ? "text-fuchsia-400" : ""
          }`}
        >
          <Home className="mb-1 h-6 w-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          to={`/artist`}
          onClick={() => handleNavigation("/artist")}
          className={`flex flex-col items-center ${
            activePath === "/artist" ? "text-fuchsia-400" : ""
          }`}
        >
          <Palette className="mb-1 h-6 w-6" />
          <span className="text-sm">Artist</span>
        </Link>
        <Link
          to="/dashboard"
          onClick={() => handleNavigation("/dashboard")}
          className={`flex flex-col items-center ${
            activePath === "/dashboard" ? "text-fuchsia-400" : ""
          }`}
        >
          <CircleGauge className="mb-1 h-6 w-6" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          to="/login"
          onClick={() => handleNavigation("/login")}
          className={`flex flex-col items-center ${
            activePath === "/login" ? "text-fuchsia-400" : ""
          }`}
        >
          <User className="mb-1 h-6 w-6" />
          <span className="text-sm">User</span>
        </Link>
      </div>
    </nav>
  );
};
