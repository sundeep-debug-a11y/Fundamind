import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

interface PhoneAuthScreenProps {
  onComplete: () => void;
}

export function PhoneAuthScreen({ onComplete }: PhoneAuthScreenProps) {
  const { t } = useLanguage();
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
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
            <ImageWithFallback 
              src="/fundamind-logo.png/WhatsApp%20Image%202025-10-16%20at%2018.30.14_2027928d.jpg" 
              alt="FundaMind Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-3xl mb-2 font-semibold">
            {showOtp ? t('verifyOtp') : t('welcomeToFundamind')}
          </h2>
          <p className="text-muted-foreground">
            {showOtp 
              ? `${t('enterOtpSent')} ${phone}`
              : t('enterMobileNumber')}
          </p>
        </div>

        {!showOtp ? (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">{t('mobileNumber')}</label>
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
                {t('agreeToTerms')}
              </label>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={phone.length !== 10 || !agreed}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
{t('sendOtp')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block mb-4 text-sm">{t('enterOtp')}</label>
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
              {t('didntReceiveCode')}
            </button>

            <Button
              onClick={handleVerify}
              disabled={otp.some(digit => digit === "")}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
{t('verifyAndContinue')}
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
