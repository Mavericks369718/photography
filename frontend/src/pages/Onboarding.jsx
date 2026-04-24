import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
      <div className="relative w-full max-w-[480px] bg-white min-h-screen flex flex-col px-6">
        <div className="pt-7 pb-6">
          <span className="text-[13px] font-semibold tracking-[0.22em] uppercase text-neutral-900">
            Corporate<span className="text-rose-700">Moments</span>
          </span>
        </div>

        <div className="flex-1 flex flex-col pt-10">
          <h1 className="text-[34px] font-extrabold text-neutral-900 leading-[1.05] tracking-[-0.02em]">
            Welcome.<br />What&rsquo;s your<br />name?
          </h1>
          <p className="mt-3 text-[14.5px] text-neutral-500 leading-relaxed">
            We&rsquo;ll use it to personalise your bookings.
          </p>

          <div className="mt-10">
            <label className="text-[11.5px] font-semibold text-neutral-500 uppercase tracking-[0.15em]">
              Full name
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
              placeholder="Priya Sharma"
              className="mt-3 w-full border-b-2 border-neutral-200 focus:border-neutral-900 bg-transparent pb-2 text-[22px] font-semibold text-neutral-900 outline-none placeholder:text-neutral-300 placeholder:font-normal transition-colors"
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!valid}
            className={`mt-auto mb-10 w-full inline-flex items-center justify-center gap-2 rounded-full py-[18px] text-[15px] font-semibold transition-all ${
              valid
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Continue
            {valid && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
