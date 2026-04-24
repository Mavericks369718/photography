import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85",
    accent: "story.",
    line1: "Every frame",
    line2: "tells a",
  },
  {
    image:
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1400&q=85",
    accent: "moment.",
    line1: "Capture a",
    line2: "timeless",
  },
  {
    image:
      "https://images.pexels.com/photos/31107091/pexels-photo-31107091.jpeg?w=1400&q=85",
    accent: "forever.",
    line1: "Made to",
    line2: "last",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slide, setSlide] = useState(0);
  const valid = name.trim().length >= 2;

  useEffect(() => {
    const id = setInterval(() => setSlide((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleContinue = () => {
    if (!valid) return;
    localStorage.setItem("cm_name", name.trim());
    navigate("/");
  };

  const current = SLIDES[slide];

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen overflow-hidden">
        {/* Background slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-[1.08] animate-[kenburns_14s_ease-in-out_infinite_alternate]"
            />
          </div>
        ))}

        {/* Gradient overlays for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.18),transparent_55%)]" />

        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col px-7">
          {/* Brand */}
          <div className="pt-7">
            <span className="text-[12px] font-semibold tracking-[0.3em] uppercase text-white/80">
              Corporate<span className="text-rose-400">Moments</span>
            </span>
          </div>

          {/* Hero copy */}
          <div className="mt-16 flex-1">
            <p className="text-white/70 text-[12.5px] font-semibold tracking-[0.2em] uppercase">
              Welcome aboard
            </p>
            <h1
              key={slide}
              className="mt-3 text-white text-[52px] leading-[0.98] tracking-[-0.03em] animate-[fadeUp_0.9s_ease]"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
            >
              {current.line1}
              <br />
              {current.line2}{" "}
              <span
                className="italic text-rose-300"
                style={{ fontWeight: 400 }}
              >
                {current.accent}
              </span>
            </h1>
            <p className="mt-5 max-w-[85%] text-[14.5px] text-white/80 leading-relaxed">
              Book trusted photographers for every chapter of your story.
              <br />
              Tell us what to call you.
            </p>

            {/* Dot indicators */}
            <div className="mt-7 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-[3px] rounded-full transition-all ${
                    i === slide ? "w-8 bg-white" : "w-3 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating glass card */}
          <div className="pb-8">
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-5">
              <label className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.2em]">
                Your name
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                placeholder="Priya Sharma"
                className="mt-2 w-full bg-transparent pb-2 text-[22px] font-semibold text-white outline-none placeholder:text-white/35 border-b border-white/30 focus:border-white transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
              <button
                onClick={handleContinue}
                disabled={!valid}
                className={`mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full py-[16px] text-[15px] font-semibold transition-all ${
                  valid
                    ? "bg-white text-neutral-900 hover:bg-rose-50 shadow-[0_10px_24px_rgba(255,255,255,0.2)]"
                    : "bg-white/20 text-white/50 cursor-not-allowed"
                }`}
              >
                Continue
                {valid && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-4 text-center text-[11.5px] text-white/55">
              You can change this anytime in your profile.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes kenburns {
            from { transform: scale(1.05) translate(0, 0); }
            to   { transform: scale(1.12) translate(-10px, -6px); }
          }
        `}</style>
      </div>
    </div>
  );
}
