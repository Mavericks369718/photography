import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Calendar, User } from "lucide-react";

const ITEMS = [
  { id: "home",     label: "Home",     icon: Home,     path: "/" },
  { id: "search",   label: "Search",   icon: Search,   path: "/search" },
  { id: "bookings", label: "Bookings", icon: Calendar, path: "/bookings" },
  { id: "account",  label: "Account",  icon: User,     path: "/account" }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeId =
    pathname === "/" ? "home" :
    pathname.startsWith("/search") ? "search" :
    pathname.startsWith("/bookings") ? "bookings" :
    pathname.startsWith("/account") ? "account" :
    null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40">
      <div className="bg-white/95 backdrop-blur border-t border-neutral-200 px-4 pt-2 pb-3 shadow-[0_-6px_20px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-4 items-end" data-testid="bottom-nav">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            const selected = activeId === it.id;
            return (
              <button
                key={it.id}
                data-testid={`bottom-nav-${it.id}-btn`}
                onClick={() => navigate(it.path)}
                className="flex flex-col items-center py-1.5 group"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${selected ? "text-rose-700" : "text-neutral-500 group-hover:text-neutral-700"}`}
                  strokeWidth={selected ? 2.4 : 2}
                />
                <span className={`mt-0.5 text-[11px] font-semibold transition-colors ${selected ? "text-rose-700" : "text-neutral-500"}`}>
                  {it.label}
                </span>
                {selected && <span className="mt-0.5 h-1 w-5 rounded-full bg-rose-700"/>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
