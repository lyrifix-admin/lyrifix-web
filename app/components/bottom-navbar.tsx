// components/BottomNavbar.tsx
import { Home, User } from "lucide-react";

export const BottomNavbar = () => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 bg-black text-white">
      <div className="flex items-center justify-around py-3">
        <button className="flex flex-col items-center">
          <Home className="mb-1 h-6 w-6" />
          <span className="text-sm">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <User className="mb-1 h-6 w-6" />
          <span className="text-sm">Login</span>
        </button>
      </div>
    </nav>
  );
};
