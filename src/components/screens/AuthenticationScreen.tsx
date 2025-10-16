import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface AuthenticationScreenProps {
  onComplete: () => void;
}

export function AuthenticationScreen({ onComplete }: AuthenticationScreenProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOTP, setShowOTP] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length === 10 && termsAccepted && privacyAccepted) {
      setShowOTP(true);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      if (newOTP.every(digit => digit !== '') && newOTP.join('') === '123456') {
        setTimeout(() => onComplete(), 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00A86B] to-[#006B5E] rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl mb-2 text-gray-900">
              {showOTP ? 'Enter OTP' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {showOTP 
                ? `We've sent a code to +91 ${phone}` 
                : 'Login to continue your financial journey'}
            </p>
          </div>

          {!showOTP ? (
            <>
              {/* Phone Input */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <div className="flex gap-3">
                  <div className="w-20 px-4 py-3 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#00A86B] transition-all"
                  />
                </div>
              </div>

              {/* Terms & Privacy */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the <span className="text-[#00A86B]">Terms of Service</span>
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    className="mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the <span className="text-[#00A86B]">Privacy Policy</span>
                  </label>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900">
                  🔒 Your data is encrypted and secure. We'll never share your information.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="mb-8">
                <div className="flex gap-2 justify-center mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      className="w-12 h-14 text-center bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#00A86B] transition-all"
                    />
                  ))}
                </div>
                <div className="text-center">
                  <button className="text-[#00A86B] text-sm">
                    Resend OTP
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-900">
                  💡 Demo OTP: 123456
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 pb-8">
        <button
          onClick={showOTP ? undefined : handlePhoneSubmit}
          disabled={showOTP || phone.length !== 10 || !termsAccepted || !privacyAccepted}
          className="w-full bg-[#00A86B] text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {showOTP ? 'Verifying...' : 'Send OTP'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
