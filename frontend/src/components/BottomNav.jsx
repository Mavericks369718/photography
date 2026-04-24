import React from "react";
import { Home, Gift, Calendar, User, Aperture } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "offers", label: "Offers", icon: Gift },
  { id: "explore", label: "Explore", icon: Aperture, center: true },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "account", label: "Account", icon: User }
];

export default function BottomNav({ active, onChange }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-4 pt-2 pb-3">
        <div className="grid grid-cols-5 items-end">
          {items.map((it) => {
            const Icon = it.icon;
            const selected = active === it.id;
            if (it.center) {
              return (
                <button
                  key={it.id}
                  onClick={() => onChange(it.id)}
                  className="relative flex flex-col items-center -mt-7"
                >
                  <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg ring-4 ring-white flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                  </span>
                  <span className="mt-1 text-[11px] font-semibold text-neutral-800">
                    {it.label}
                  </span>
                </button>
              );
            }
            return (
              <button
                key={it.id}
                onClick={() => onChange(it.id)}
                className="flex flex-col items-center py-1.5 group"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${selected ? "text-rose-700" : "text-neutral-500 group-hover:text-neutral-700"}`}
                  strokeWidth={selected ? 2.4 : 2}
                />
                <span
                  className={`mt-0.5 text-[11px] font-medium transition-colors ${selected ? "text-rose-700" : "text-neutral-500"}`}
                >
                  {it.label}
                </span>
                {selected && (
                  <span className="mt-0.5 h-1 w-5 rounded-full bg-rose-700" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
