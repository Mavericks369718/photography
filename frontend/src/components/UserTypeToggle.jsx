import React from "react";
import { userTypes } from "../mock";

export default function UserTypeToggle({ active, onChange }) {
  return (
    <div className="px-5 pb-5">
      <div className="flex items-center gap-3">
        {userTypes.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex-1 flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 transition-all ${
                selected
                  ? "bg-rose-50 ring-rose-700"
                  : "bg-white ring-neutral-200 hover:ring-neutral-300"
              }`}
            >
              <span className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-white shadow-sm shrink-0">
                <img src={t.icon} alt={t.label} className="h-full w-full object-cover" />
              </span>
              <span
                className={`text-[15px] font-semibold ${
                  selected ? "text-rose-800" : "text-neutral-800"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
