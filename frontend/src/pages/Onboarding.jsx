import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col">
        {/* Hero photograph */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50" />

          <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[0.26em] uppercase text-white drop-shadow">
              Corporate<span className="text-rose-300">Moments</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/80">
              Step 2 of 2
            </span>
          </div>

          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-8">
            <p className="text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">
              Almost there
            </p>
            <h1 className="mt-2 text-white text-[30px] font-extrabold leading-[1.05] tracking-[-0.025em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              Welcome.<br />What should we<br />call you?
            </h1>
          </div>
        </div>

        {/* Curved white content area matching Home & Login */}
        <div className="relative -mt-5 flex-1 bg-white rounded-t-[28px] px-6 pt-7 pb-8 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
          <p className="text-[13.5px] text-neutral-500 leading-relaxed">
            We&rsquo;ll use this to personalise your bookings and greet you when you return.
          </p>

          <div className="mt-6 rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-5">
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
            className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-bold transition-all ${
              valid
                ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Continue
            {valid && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="mt-auto pt-6 text-center text-[11px] text-neutral-400">
            You can update this anytime from your profile.
          </p>
        </div>
      </div>
    </div>
  );
}
