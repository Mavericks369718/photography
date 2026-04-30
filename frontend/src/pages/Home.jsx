import React from "react";
import HeroHeader from "../components/HeroHeader";
import CategoriesGrid from "../components/CategoriesGrid";
import OffersStrip from "../components/OffersStrip";
import Testimonials from "../components/Testimonials";
import BottomNav from "../components/BottomNav";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] bg-white min-h-screen shadow-xl overflow-hidden pb-24" data-testid="home-screen">
        <HeroHeader />

        <div className="pt-4" />

        <CategoriesGrid />
        <OffersStrip />
        <Testimonials />

        <BottomNav />
      </div>
    </div>
  );
}
