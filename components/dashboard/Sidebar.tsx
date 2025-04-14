"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shield, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  {
    href: "/monitoring",
    icon: LayoutDashboard,
    label: "Tableau de bord",
  },
  {
    href: "/firewall",
    icon: Shield,
    label: "Pare-feu",
  },

  {
    href: "/users",
    icon: Users,
    label: "Utilisateurs",
  },
  {
    href: "/logs",
    icon: FileText,
    label: "Logs",
  },
];

import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();

  // Filtrer les liens selon le rôle
  const filteredNavItems = navItems.filter(item => {
    if ((item.href === "/users" || item.href === "/logs") && !isAdmin) {
      return false;
    }
    return true;
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white h-screen">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Image alt="MitNetwork" src="/logo.png" width={100} height={100} />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-[#22002d]/10 text-[#22002d]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#22002d]"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    pathname === item.href
                      ? "text-[#22002d]"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 shadow-sm"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
