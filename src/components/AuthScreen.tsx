import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Eye, EyeOff, ArrowLeft, User, Mail, Phone, Lock, Calendar, Briefcase } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00A86B] via-[#006B5E] to-[#0D47A1] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        {onBack && (
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="flex-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00A86B] to-[#0D47A1] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">FM</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome to FundaMind</CardTitle>
            <CardDescription className="text-gray-600">
              {activeTab === "login" ? "Sign in to your account" : "Create your account to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                {errors.general && (
                  <p className="text-sm text-red-500 text-center">{errors.general}</p>
                )}

                <Button 
                  onClick={handleLogin} 
                  className="w-full h-12 bg-gradient-to-r from-[#00A86B] to-[#0D47A1] hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <button className="text-[#00A86B] hover:underline">
                    Forgot your password?
                  </button>
                </div>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </Label>
                    <Input
                      id="signup-name"
                      placeholder="Full name"
                      value={signUpForm.name}
                      onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-age" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Age
                    </Label>
                    <Input
                      id="signup-age"
                      type="number"
                      placeholder="Age"
                      value={signUpForm.age}
                      onChange={(e) => setSignUpForm({ ...signUpForm, age: e.target.value })}
                      className={errors.age ? "border-red-500" : ""}
                    />
                    {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="10-digit phone number"
                    value={signUpForm.phone}
                    onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-designation" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Designation
                  </Label>
                  <Input
                    id="signup-designation"
                    placeholder="e.g., Student, Professional, etc."
                    value={signUpForm.designation}
                    onChange={(e) => setSignUpForm({ ...signUpForm, designation: e.target.value })}
                    className={errors.designation ? "border-red-500" : ""}
                  />
                  {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-retype-password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-retype-password"
                      type={showRetypePassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signUpForm.retypePassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, retypePassword: e.target.value })}
                      className={errors.retypePassword ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showRetypePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.retypePassword && <p className="text-sm text-red-500">{errors.retypePassword}</p>}
                </div>

                {errors.general && (
                  <p className="text-sm text-red-500 text-center">{errors.general}</p>
                )}

                <Button 
                  onClick={handleSignUp} 
                  className="w-full h-12 bg-gradient-to-r from-[#00A86B] to-[#0D47A1] hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-xs text-gray-600">
                  By signing up, you agree to our{" "}
                  <button className="text-[#00A86B] hover:underline">Terms of Service</button>
                  {" "}and{" "}
                  <button className="text-[#00A86B] hover:underline">Privacy Policy</button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
