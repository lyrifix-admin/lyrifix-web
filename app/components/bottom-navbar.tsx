import { CircleGaugeIcon, HomeIcon, PaletteIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";
import type { User } from "~/schemas/user";

interface BottomNavbarProps {
  isAuthenticated?: boolean;
  user?: User;
}

export const BottomNavbar = ({ isAuthenticated, user }: BottomNavbarProps) => {
  const navLinks = [
    { to: "/", icon: <HomeIcon />, text: "Home" },
    { to: "/artists", icon: <PaletteIcon />, text: "Artists" },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white">
      <div className="grid grid-cols-4 gap-4">
        {navLinks.map((navLink) => {
          return (
            <NavLink
              key={navLink.to}
              to={navLink.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center p-2",
                  isActive && "text-fuchsia-400",
                )
              }
            >
              {navLink.icon}
              <span className="text-sm">{navLink.text}</span>
            </NavLink>
          );
        })}

        {isAuthenticated && user && (
          <NavLink
            to="/library"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2",
                isActive && "text-fuchsia-400",
              )
            }
          >
            <CircleGaugeIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Your Library</span>
          </NavLink>
        )}

        {isAuthenticated && user && (
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2",
                isActive && "text-fuchsia-400",
              )
            }
          >
            <UserIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Logout</span>
          </NavLink>
        )}

        {!isAuthenticated && !user && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2",
                isActive && "text-fuchsia-400",
              )
            }
          >
            <UserIcon className="mb-1 h-6 w-6" />
            <span className="text-sm">Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
