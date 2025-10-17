import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Eye, EyeOff, ArrowLeft, User, Mail, Phone, Lock, Calendar, Briefcase, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AuthScreenProps {
  onAuthSuccess: () => void;
  onBack?: () => void;
}

interface SignUpForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  retypePassword: string;
  age: string;
  designation: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
  const { t } = useLanguage();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: ""
  });

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    retypePassword: "",
    age: "",
    designation: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateSignUp = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!signUpForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!signUpForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(signUpForm.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!signUpForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(signUpForm.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!signUpForm.password) {
      newErrors.password = "Password is required";
    } else if (signUpForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signUpForm.retypePassword) {
      newErrors.retypePassword = "Please confirm your password";
    } else if (signUpForm.password !== signUpForm.retypePassword) {
      newErrors.retypePassword = "Passwords do not match";
    }

    if (!signUpForm.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(signUpForm.age) < 13 || parseInt(signUpForm.age) > 100) {
      newErrors.age = "Please enter a valid age (13-100)";
    }

    if (!signUpForm.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!loginForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      onAuthSuccess();
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: error instanceof Error ? error.message : "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateSignUp()) return;

    setIsLoading(true);
    try {
      await signup({
        name: signUpForm.name,
        email: signUpForm.email,
        phone: signUpForm.phone,
        password: signUpForm.password,
        age: parseInt(signUpForm.age, 10),
        designation: signUpForm.designation,
      });
      onAuthSuccess();
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors({ general: error instanceof Error ? error.message : "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1A2332] via-[#006B5E] to-[#0D47A1] flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#F4B942]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 relative z-10">
        {onBack && (
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl overflow-hidden">
              {logoError ? (
                <Sparkles className="w-8 h-8 text-[#00A86B]" />
              ) : (
                <ImageWithFallback 
                  src="/fundamind-logo.png/WhatsApp%20Image%202025-10-16%20at%2018.30.14_2027928d.jpg" 
                  alt="FUNDAMIND Logo" 
                  className="w-full h-full object-contain p-1.5"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">Welcome to FundaMind</h1>
            <p className="text-white/80 text-sm">
              {activeTab === "login" ? "Sign in to continue your financial journey" : "Start your financial education journey"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-gray-100 rounded-2xl p-1">
                  <TabsTrigger value="login" className="rounded-xl font-medium">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-xl font-medium">Sign Up</TabsTrigger>
                </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={`h-12 rounded-xl border-2 transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                    />
                    {errors.email && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Lock className="w-4 h-4 text-gray-500" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={`h-12 rounded-xl border-2 pr-12 transition-colors ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.password}</p>}
                  </div>
                </div>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-600 text-center flex items-center justify-center gap-2">
                      <span>⚠️</span>{errors.general}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleLogin} 
                  className="w-full h-14 bg-gradient-to-r from-[#00A86B] to-[#0D47A1] hover:from-[#00A86B]/90 hover:to-[#0D47A1]/90 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <button className="text-[#00A86B] hover:text-[#00A86B]/80 font-medium text-sm transition-colors">
                    Forgot your password?
                  </button>
                </div>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="flex items-center gap-2 text-gray-700 font-medium">
                        <User className="w-4 h-4 text-gray-500" />
                        Name
                      </Label>
                      <Input
                        id="signup-name"
                        placeholder="Full name"
                        value={signUpForm.name}
                        onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                        className={`h-12 rounded-xl border-2 transition-colors ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                      />
                      {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-age" className="flex items-center gap-2 text-gray-700 font-medium">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        Age
                      </Label>
                      <Input
                        id="signup-age"
                        type="number"
                        placeholder="Age"
                        value={signUpForm.age}
                        onChange={(e) => setSignUpForm({ ...signUpForm, age: e.target.value })}
                        className={`h-12 rounded-xl border-2 transition-colors ${errors.age ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                      />
                      {errors.age && <p className="text-xs text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.age}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      className={`h-12 rounded-xl border-2 transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                    />
                    {errors.email && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="10-digit phone number"
                      value={signUpForm.phone}
                      maxLength={10}
                      onChange={(e) => {
                        // Only allow numeric input
                        const value = e.target.value.replace(/\D/g, '');
                        setSignUpForm({ ...signUpForm, phone: value });
                      }}
                      className={`h-12 rounded-xl border-2 transition-colors ${errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                    />
                    {errors.phone && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-designation" className="flex items-center gap-2 text-gray-700 font-medium">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      Designation
                    </Label>
                    <Input
                      id="signup-designation"
                      placeholder="e.g., Student, Professional, etc."
                      value={signUpForm.designation}
                      onChange={(e) => setSignUpForm({ ...signUpForm, designation: e.target.value })}
                      className={`h-12 rounded-xl border-2 transition-colors ${errors.designation ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                    />
                    {errors.designation && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.designation}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="flex items-center gap-2 text-gray-700 font-medium">
                        <Lock className="w-4 h-4 text-gray-500" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signUpForm.password}
                          onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                          className={`h-12 rounded-xl border-2 pr-12 transition-colors ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-retype-password" className="flex items-center gap-2 text-gray-700 font-medium">
                        <Lock className="w-4 h-4 text-gray-500" />
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-retype-password"
                          type={showRetypePassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpForm.retypePassword}
                          onChange={(e) => setSignUpForm({ ...signUpForm, retypePassword: e.target.value })}
                          className={`h-12 rounded-xl border-2 pr-12 transition-colors ${errors.retypePassword ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#00A86B]"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRetypePassword(!showRetypePassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showRetypePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.retypePassword && <p className="text-sm text-red-500 flex items-center gap-1"><span>⚠️</span>{errors.retypePassword}</p>}
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-600 text-center flex items-center justify-center gap-2">
                      <span>⚠️</span>{errors.general}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleSignUp} 
                  className="w-full h-14 bg-gradient-to-r from-[#00A86B] to-[#0D47A1] hover:from-[#00A86B]/90 hover:to-[#0D47A1]/90 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <button className="text-[#00A86B] hover:text-[#00A86B]/80 font-medium transition-colors">Terms of Service</button>
                  {" "}and{" "}
                  <button className="text-[#00A86B] hover:text-[#00A86B]/80 font-medium transition-colors">Privacy Policy</button>
                </div>
              </TabsContent>
            </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
