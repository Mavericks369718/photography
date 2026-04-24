import React from "react";
import { MapPin, ChevronDown, Bell } from "lucide-react";
import { locationData } from "../mock";

export default function TopHeader() {
  return (
    <div className="w-full bg-[#FFF1EC] px-5 pt-4 pb-3">
      <div className="flex items-center justify-between">
        <button className="flex flex-col items-start group">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 shadow-sm">
              <MapPin className="h-3 w-3 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[17px] font-semibold text-neutral-900 tracking-tight">
              {locationData.country}
            </span>
            <ChevronDown className="h-4 w-4 text-neutral-700 transition-transform group-hover:translate-y-0.5" />
          </div>
          <span className="ml-7 mt-0.5 text-[12px] text-neutral-500 font-medium">
            {locationData.city}
          </span>
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5 hover:bg-white transition-colors">
          <Bell className="h-5 w-5 text-neutral-700" strokeWidth={2} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
      </div>
    </div>
  );
}
