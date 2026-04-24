import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const valid = name.trim().length >= 2;

  const handleContinue = () => {
    if (!valid) return;
    localStorage.setItem("cm_name", name.trim());
    toast.success(`Welcome, ${name.trim().split(" ")[0]}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] bg-white min-h-screen shadow-xl flex flex-col">
        <div className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 pt-14 pb-14 px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 ring-1 ring-rose-100 px-3 py-1 text-[11px] font-semibold text-rose-700 backdrop-blur">
            <Sparkles className="h-3 w-3" /> One quick step
          </span>
          <h1 className="mt-5 text-[30px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight">
            Welcome to
            <br />
            <span className="text-rose-800">Click Madam</span>
          </h1>
          <p className="mt-2 text-[14px] text-neutral-600 leading-snug max-w-[90%]">
            Let&rsquo;s personalise your experience. What should we call you?
          </p>
        </div>

        <div className="-mt-8 mx-5 rounded-3xl bg-white ring-1 ring-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
          <label className="text-[12.5px] font-semibold text-neutral-500 uppercase tracking-wider">
            Your name
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            placeholder="e.g. Priya Sharma"
            className="mt-2 w-full rounded-2xl ring-1 ring-neutral-200 focus:ring-2 focus:ring-rose-500 bg-white px-4 py-3.5 text-[18px] font-semibold text-neutral-900 outline-none placeholder:text-neutral-300 placeholder:font-medium transition-all"
          />

          <button
            onClick={handleContinue}
            disabled={!valid}
            className={`mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl py-4 text-[15px] font-bold transition-all ${
              valid
                ? "bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
          >
            Continue
            {valid && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="mt-3 text-center text-[11.5px] text-neutral-400">
            Takes less than 10 seconds • You can edit this later
          </p>
        </div>
      </div>
    </div>
  );
}
