import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight, Shield } from "lucide-react";

interface PhoneAuthScreenProps {
  onComplete: () => void;
}

export function PhoneAuthScreen({ onComplete }: PhoneAuthScreenProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSendOtp = () => {
    if (phone.length === 10 && agreed) {
      setShowOtp(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== "")) {
      onComplete();
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-6">
        <div className="mt-12 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl mb-2 font-semibold">
            {showOtp ? "Verify OTP" : "Welcome to FundaMind"}
          </h2>
          <p className="text-muted-foreground">
            {showOtp 
              ? `Enter the 6-digit code sent to +91 ${phone}`
              : "Enter your mobile number to get started"}
          </p>
        </div>

        {!showOtp ? (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Mobile Number</label>
              <div className="flex gap-2">
                <div className="w-20 h-14 bg-card border border-border rounded-xl flex items-center justify-center">
                  <span className="text-muted-foreground">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1 h-14 bg-card border-border rounded-xl px-4"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <span className="text-primary">Terms & Conditions</span> and{" "}
                <span className="text-primary">Privacy Policy</span>
              </label>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={phone.length !== 10 || !agreed}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
              Send OTP
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block mb-4 text-sm">Enter OTP</label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center bg-card border-2 border-border rounded-xl focus:border-primary outline-none transition-colors"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button className="text-primary text-sm">
              Didn't receive code? Resend OTP
            </button>

            <Button
              onClick={handleVerify}
              disabled={otp.some(digit => digit === "")}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
              Verify & Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}

        <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to FundaMind's secure authentication
        </div>
      </div>
    </div>
  );
}
