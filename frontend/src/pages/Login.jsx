import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const HERO = "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1400&q=85";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const phoneValid = phone.length === 10;

  const sendOtp = () => {
    if (!phoneValid) return;
    setStep("otp");
    setTimer(30);
    toast.success("Code sent", { description: `+91 ${phone}` });
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  };
  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
  };
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...otp]; pasted.split("").forEach((ch, idx) => (next[idx] = ch)); setOtp(next);
    e.preventDefault(); inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };
  const verify = () => {
    if (otp.join("").length !== 6) return;
    localStorage.setItem("cm_phone", phone);
    navigate("/onboarding");
  };
  const resend = () => {
    if (timer > 0) return;
    setTimer(30); setOtp(["", "", "", "", "", ""]);
    toast.success("Code resent");
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col">
        {/* Hero photograph — like Home HeroHeader */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50" />

          <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
            {step === "otp" ? (
              <button
                onClick={() => setStep("phone")}
                className="h-10 w-10 -ml-2 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2} />
              </button>
            ) : (
              <span className="text-[12px] font-semibold tracking-[0.26em] uppercase text-white drop-shadow">
                Corporate<span className="text-rose-300">Moments</span>
              </span>
            )}
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/80">
              Est. 2025
            </span>
          </div>

          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-8">
            <p className="text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">
              {step === "phone" ? "Sign in" : "Verify"}
            </p>
            <h1 className="mt-2 text-white text-[30px] font-extrabold leading-[1.05] tracking-[-0.025em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {step === "phone" ? (<>Your moments,<br />booked in minutes.</>) : (<>Enter the<br />6-digit code.</>)}
            </h1>
          </div>
        </div>

        {/* Curved white content area — same device as Home */}
        <div className="relative -mt-5 flex-1 bg-white rounded-t-[28px] px-6 pt-7 pb-8 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
          {step === "phone" ? (
            <>
              <p className="text-[13.5px] text-neutral-500 leading-relaxed">
                We&rsquo;ll send a one-time code to verify your mobile number.
              </p>

              <div className="mt-6 rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-5">
                <label className="text-[10.5px] font-semibold text-neutral-500 uppercase tracking-[0.22em]">
                  Mobile number
                </label>
                <div className="mt-2.5 flex items-center gap-3">
                  <span className="text-[22px] font-bold text-neutral-900">+91</span>
                  <span className="h-7 w-px bg-neutral-300" />
                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent outline-none text-[22px] font-bold text-neutral-900 tracking-wide placeholder:text-neutral-300 placeholder:font-medium"
                  />
                </div>
              </div>

              <button
                disabled={!phoneValid}
                onClick={sendOtp}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-bold transition-all ${
                  phoneValid
                    ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Send code
                {phoneValid && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="mt-auto pt-6 text-center text-[11px] text-neutral-400">
                By continuing you agree to our <span className="font-semibold text-neutral-600">Terms</span> &amp; <span className="font-semibold text-neutral-600">Privacy</span>.
              </p>
            </>
          ) : (
            <>
              <p className="text-[13.5px] text-neutral-500 leading-relaxed">
                Sent to <span className="font-bold text-neutral-900">+91 {phone}</span>
              </p>

              <div className="mt-6 grid grid-cols-6 gap-2" onPaste={handlePaste}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`h-14 text-center text-[22px] font-bold text-neutral-900 rounded-xl bg-[#FFF7F3] ring-1 transition-all outline-none ${
                      d ? "ring-2 ring-rose-700 bg-white" : "ring-rose-100 focus:ring-2 focus:ring-rose-700"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-5 text-[13px] text-neutral-500">
                Didn&rsquo;t receive it?{" "}
                <button
                  onClick={resend}
                  disabled={timer > 0}
                  className={`font-bold ${timer > 0 ? "text-neutral-400 cursor-not-allowed" : "text-rose-700 underline underline-offset-[5px]"}`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                </button>
              </div>

              <button
                disabled={otp.join("").length !== 6}
                onClick={verify}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-bold transition-all ${
                  otp.join("").length === 6
                    ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Verify
                {otp.join("").length === 6 && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
