import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Camera } from "lucide-react";

const HERO = "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1400&q=85";

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const valid = name.trim().length >= 2;

  const handleContinue = () => {
    if (!valid) return;
    localStorage.setItem("cm_name", name.trim());
    navigate("/");
  };

  const firstName = name.trim().split(" ")[0];

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col">
        {/* Cinematic hero 54vh */}
        <div className="relative h-[54vh] min-h-[440px] w-full overflow-hidden">
          <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.03]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

          <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-6 flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[0.26em] uppercase text-white drop-shadow">
              Corporate<span className="text-rose-300">Moments</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              <Sparkles className="h-3 w-3" /> Step 2 / 2
            </span>
          </div>

          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-10">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">
              Almost there
            </span>
            <h1 className="mt-2.5 text-white text-[38px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              {firstName ? (
                <>Hello,<br/><span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">{firstName}.</span></>
              ) : (
                <>What should<br/>we <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">call you?</span></>
              )}
            </h1>
          </div>
        </div>

        {/* White content card */}
        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-6 pt-6 pb-7 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-5">
            <label className="text-[10.5px] font-semibold text-neutral-500 uppercase tracking-[0.22em]">
              Full name
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
              placeholder="Priya Sharma"
              className="mt-2.5 w-full bg-transparent outline-none text-[22px] font-bold text-neutral-900 placeholder:text-neutral-300 placeholder:font-medium"
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!valid}
            className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-bold transition-all ${
              valid
                ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Continue
            {valid && <ArrowRight className="h-4 w-4" />}
          </button>

          {/* What to expect strip — fills bottom with soul */}
          <div className="mt-auto">
            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-3">
              What happens next
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 rounded-xl bg-neutral-50 ring-1 ring-neutral-100 px-3.5 py-2.5">
                <span className="h-8 w-8 rounded-lg bg-white ring-1 ring-rose-100 flex items-center justify-center shrink-0">
                  <Camera className="h-4 w-4 text-rose-700" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] text-neutral-700 leading-tight">
                  Browse <span className="font-bold text-neutral-900">1,200+ verified</span> photographers near you
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-neutral-50 ring-1 ring-neutral-100 px-3.5 py-2.5">
                <span className="h-8 w-8 rounded-lg bg-white ring-1 ring-rose-100 flex items-center justify-center shrink-0">
                  <Heart className="h-4 w-4 text-rose-700" strokeWidth={2.2} fill="currentColor" />
                </span>
                <span className="text-[13px] text-neutral-700 leading-tight">
                  Book your first session in <span className="font-bold text-neutral-900">under 2 minutes</span>
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-neutral-400">
              You can update this anytime from your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
