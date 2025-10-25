import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertCircle,
  Loader,
  GraduationCap,
  User,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { loginUser, verifyOtp } from "../../features/auth/AuthSlice"; // make sure verifyOtp exists

const API_BASE_URL = "http://localhost:8080/auth";

const Login = () => {
  const [email, setEmail] = useState("rishabhrajora20@gmail.com");
  const [password, setPassword] = useState("Rishabh@123");
  const [role, setRole] = useState("TEACHER");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false); // renamed to avoid conflict

  const {
    loading: reduxLoading,
    error,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Send login request → backend sends OTP
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStep(1); // optional, ensures step is login
    setLocalLoading(true);

    const result = await dispatch(loginUser({ email, password, role }));
    if (result.meta.requestStatus === "fulfilled") {
      setMessage("OTP sent! Check your email.");
      setStep(2); // move to OTP step
    } else {
      setMessage(result.payload || "Login failed");
    }

    setLocalLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Please enter OTP");

    setLocalLoading(true);


    const result = await dispatch(verifyOtp({ email, otp, role }));
   
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard"); // OTP verified → dashboard
    } else {
      setMessage(result.payload || "OTP verification failed");
    }

    setLocalLoading(false);
  };

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const roleOptions = [
    {
      value: "TEACHER",
      label: "Teacher",
      icon: GraduationCap,
      activeClass: "bg-purple-600 text-white ring-purple-300",
    },
    {
      value: "STUDENT",
      label: "Student",
      icon: User,
      activeClass: "bg-teal-600 text-white ring-teal-300",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-6 flex items-center justify-center gap-2">
          <LogIn className="w-7 h-7 text-purple-600" /> iAttend Login
        </h2>

        {/* Role Selection */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setRole(option.value)}
                disabled={step === 2}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  role === option.value
                    ? `${option.activeClass} shadow-md ring-2 ring-offset-1`
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Step 1: Login Form */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.email ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.password ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={localLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50"
            >
              {localLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {localLoading ? "Sending OTP..." : "Login & Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={localLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {localLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
              {localLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {message && (
          <div className="mt-4 p-3 text-center text-sm text-slate-700 bg-slate-100 rounded-lg">
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?
          <a
            href="/register"
            className="text-purple-600 hover:text-purple-700 font-medium ml-1"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
