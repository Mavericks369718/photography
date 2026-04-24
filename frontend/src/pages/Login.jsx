import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const phoneValid = phone.replace(/\D/g, "").length === 10;

  const sendOtp = () => {
    if (!phoneValid) return;
    setStep("otp");
    setTimer(30);
    toast.success("OTP sent to +91 " + phone, {
      description: "Use 123456 for demo"
    });
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, idx) => (next[idx] = ch));
    setOtp(next);
    e.preventDefault();
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verify = () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    // mock verification - any 6 digits OK
    localStorage.setItem("cm_phone", phone);
    toast.success("Verified!");
    navigate("/onboarding");
  };

  const resend = () => {
    if (timer > 0) return;
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    toast.success("OTP resent");
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] bg-white min-h-screen shadow-xl flex flex-col">
        {/* Soft hero band */}
        <div className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 pt-10 pb-16 px-6">
          <div className="flex items-center gap-2.5">
            <span className="h-10 w-10 rounded-xl bg-white shadow-sm ring-1 ring-rose-100 flex items-center justify-center">
              <Camera className="h-5 w-5 text-rose-700" strokeWidth={2.2} />
            </span>
            <span className="text-[18px] font-extrabold text-neutral-900 tracking-tight">
              Click Madam
            </span>
          </div>
          <h1 className="mt-10 text-[28px] font-extrabold text-neutral-900 leading-[1.15] tracking-tight">
            {step === "phone" ? "Login or Sign up" : "Verify your number"}
          </h1>
          <p className="mt-1.5 text-[14px] text-neutral-600 leading-snug">
            {step === "phone"
              ? "Book trusted photographers in seconds"
              : `We sent a 6-digit code to +91 ${phone}`}
          </p>
        </div>

        {/* Card */}
        <div className="-mt-10 mx-5 rounded-3xl bg-white ring-1 ring-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
          {step === "phone" ? (
            <>
              <label className="text-[12.5px] font-semibold text-neutral-500 uppercase tracking-wider">
                Mobile number
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl ring-1 ring-neutral-200 focus-within:ring-2 focus-within:ring-rose-500 px-4 py-3.5 transition-all">
                <span className="text-[18px] font-bold text-neutral-800">+91</span>
                <span className="h-6 w-px bg-neutral-200" />
                <input
                  autoFocus
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="98765 43210"
                  className="flex-1 bg-transparent outline-none text-[20px] font-semibold text-neutral-900 tracking-wide placeholder:text-neutral-300 placeholder:font-medium"
                />
              </div>
              <button
                disabled={!phoneValid}
                onClick={sendOtp}
                className={`mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl py-4 text-[15px] font-bold transition-all ${
                  phoneValid
                    ? "bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Send OTP
                {phoneValid && <ChevronRight className="h-4 w-4" />}
              </button>
              <div className="mt-4 flex items-center gap-2 text-[11.5px] text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Your number is safe &amp; never shared.
              </div>
            </>
          ) : (
            <>
              <label className="text-[12.5px] font-semibold text-neutral-500 uppercase tracking-wider">
                Enter 6-digit OTP
              </label>
              <div className="mt-3 flex gap-2 justify-between" onPaste={handlePaste}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-11 h-14 text-center text-[22px] font-bold text-neutral-900 rounded-xl bg-neutral-50 ring-1 transition-all outline-none ${
                      d
                        ? "ring-rose-500 bg-rose-50"
                        : "ring-neutral-200 focus:ring-2 focus:ring-rose-500"
                    }`}
                  />
                ))}
              </div>
              <button
                disabled={otp.join("").length !== 6}
                onClick={verify}
                className={`mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl py-4 text-[15px] font-bold transition-all ${
                  otp.join("").length === 6
                    ? "bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Verify &amp; Continue
                {otp.join("").length === 6 && <ChevronRight className="h-4 w-4" />}
              </button>
              <div className="mt-4 flex items-center justify-between text-[13px]">
                <button
                  onClick={() => setStep("phone")}
                  className="font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Change number
                </button>
                <button
                  onClick={resend}
                  disabled={timer > 0}
                  className={`font-semibold ${
                    timer > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-rose-700 hover:text-rose-800"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-auto pb-6 pt-10 px-6 text-center text-[11px] text-neutral-400 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="font-semibold text-neutral-600">Terms</span> &amp;{" "}
          <span className="font-semibold text-neutral-600">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}
