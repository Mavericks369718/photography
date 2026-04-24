import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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
    toast.success("OTP sent", { description: `Code sent to +91 ${phone}` });
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
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
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
    if (otp.join("").length !== 6) return;
    localStorage.setItem("cm_phone", phone);
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
      <div className="relative w-full max-w-[480px] bg-white min-h-screen flex flex-col px-6">
        {/* Brand / back */}
        <div className="pt-7 pb-6 flex items-center gap-3">
          {step === "otp" ? (
            <button
              onClick={() => setStep("phone")}
              className="h-9 w-9 -ml-1.5 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-800" strokeWidth={2.2} />
            </button>
          ) : (
            <div className="h-1 w-1" />
          )}
          <span className="text-[13px] font-semibold tracking-[0.22em] uppercase text-neutral-900">
            Corporate<span className="text-rose-700">Moments</span>
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col pt-10">
          {step === "phone" ? (
            <>
              <h1 className="text-[34px] font-extrabold text-neutral-900 leading-[1.05] tracking-[-0.02em]">
                Let&rsquo;s get<br />you in.
              </h1>
              <p className="mt-3 text-[14.5px] text-neutral-500 leading-relaxed">
                Enter your mobile number to continue. We&rsquo;ll send a one-time code.
              </p>

              <div className="mt-10">
                <label className="text-[11.5px] font-semibold text-neutral-500 uppercase tracking-[0.15em]">
                  Mobile number
                </label>
                <div className="mt-3 flex items-center border-b-2 border-neutral-200 focus-within:border-neutral-900 pb-2 transition-colors">
                  <span className="text-[22px] font-semibold text-neutral-900 pr-3">+91</span>
                  <span className="h-6 w-px bg-neutral-200 mr-3" />
                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="00000 00000"
                    className="flex-1 bg-transparent outline-none text-[22px] font-semibold text-neutral-900 tracking-wide placeholder:text-neutral-300 placeholder:font-normal"
                  />
                </div>
              </div>

              <button
                disabled={!phoneValid}
                onClick={sendOtp}
                className={`mt-auto mb-10 w-full inline-flex items-center justify-center gap-2 rounded-full py-[18px] text-[15px] font-semibold transition-all ${
                  phoneValid
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Send OTP
                {phoneValid && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-[34px] font-extrabold text-neutral-900 leading-[1.05] tracking-[-0.02em]">
                Enter the<br />6-digit code.
              </h1>
              <p className="mt-3 text-[14.5px] text-neutral-500 leading-relaxed">
                Sent to <span className="font-semibold text-neutral-800">+91 {phone}</span>
              </p>

              <div className="mt-10 flex gap-2.5 justify-between" onPaste={handlePaste}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-12 h-14 text-center text-[22px] font-bold text-neutral-900 rounded-xl bg-white border-2 transition-all outline-none ${
                      d ? "border-neutral-900" : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 text-[13.5px] text-neutral-500">
                Didn&rsquo;t get it?{" "}
                <button
                  onClick={resend}
                  disabled={timer > 0}
                  className={`font-semibold ${
                    timer > 0 ? "text-neutral-400 cursor-not-allowed" : "text-neutral-900 underline underline-offset-4 hover:text-rose-700"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </div>

              <button
                disabled={otp.join("").length !== 6}
                onClick={verify}
                className={`mt-auto mb-10 w-full inline-flex items-center justify-center gap-2 rounded-full py-[18px] text-[15px] font-semibold transition-all ${
                  otp.join("").length === 6
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
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
