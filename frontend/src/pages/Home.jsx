import React, { useState } from "react";
import TopHeader from "../components/TopHeader";
import SearchBar from "../components/SearchBar";
import HeroBanner from "../components/HeroBanner";
import UserTypeToggle from "../components/UserTypeToggle";
import CategoriesGrid from "../components/CategoriesGrid";
import MostBooked from "../components/MostBooked";
import OffersStrip from "../components/OffersStrip";
import Testimonials from "../components/Testimonials";
import BottomNav from "../components/BottomNav";
import { Camera } from "lucide-react";

export default function Home() {
  const [type, setType] = useState("personal");
  const [nav, setNav] = useState("home");

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      {/* phone-like container */}
      <div className="relative w-full max-w-[480px] bg-white min-h-screen shadow-xl">
        {/* Pink top scope */}
        <div className="bg-[#FFF1EC]">
          <TopHeader />
          <SearchBar />
        </div>

        <div className="pt-5">
          <HeroBanner />
        </div>

        <UserTypeToggle active={type} onChange={setType} />
        <CategoriesGrid />
        <MostBooked />
        <OffersStrip />
        <Testimonials />

        {/* Brand footer */}
        <div className="px-5 pb-8 pt-4">
          <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 ring-1 ring-rose-100 p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm ring-1 ring-rose-100">
              <Camera className="h-5 w-5 text-rose-700" strokeWidth={2.2} />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-neutral-900 leading-tight">
                Become a Click Madam Pro
              </p>
              <p className="text-[12px] text-neutral-600 mt-0.5">
                Join 1,200+ photographers earning on their schedule
              </p>
            </div>
            <button className="rounded-full bg-rose-800 text-white text-[12px] font-semibold px-3.5 py-2 shadow hover:bg-rose-900 transition-colors">
              Apply
            </button>
          </div>
        </div>

        <BottomNav active={nav} onChange={setNav} />
      </div>
    </div>
  );
}
