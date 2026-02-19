import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaLock,
  FaCheck,
} from "react-icons/fa";
import Navbar from "../Components/Navbar";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 6,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
    setPasswordRequirements(requirements);
    return Object.values(requirements).every((req) => req);
  };

  const validateForm = (name, email, password, photo) => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 4) {
      newErrors.name = "Name must be at least 4 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!photo.trim()) {
      newErrors.photo = "Photo URL is required";
    } else if (!photo.startsWith("http") || !photo.includes(".")) {
      newErrors.photo = "Please enter a valid image URL";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!validateForm(name, email, password, photo)) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createNewUser(email, password);
      const user = result.user;

      // Update user profile
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      setUser({ ...user, displayName: name, photoURL: photo });

      // Show success message
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Registration error:", err);

      // User-friendly error messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError({ email: "This email is already registered" });
          break;
        case "auth/invalid-email":
          setError({ email: "Invalid email address" });
          break;
        case "auth/operation-not-allowed":
          setError({ general: "Registration is currently disabled" });
          break;
        case "auth/weak-password":
          setError({ password: "Password is too weak" });
          break;
        default:
          setError({ general: "Registration failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    validatePassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">
              Create Account
            </h1>
            <p className="text-gray-400">
              Join our community of movie enthusiasts
            </p>
          </div>

          {/* Register Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-8">
            {error.general && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 text-center font-medium">
                  {error.general}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                  <FaUser className="w-4 h-4" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 pl-12 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      error.name ? "border-red-500" : "border-gray-600"
                    }`}
                    disabled={isLoading}
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {error.name && (
                  <p className="mt-2 text-sm text-red-400">{error.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                  <FaEnvelope className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 pl-12 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      error.email ? "border-red-500" : "border-gray-600"
                    }`}
                    disabled={isLoading}
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {error.email && (
                  <p className="mt-2 text-sm text-red-400">{error.email}</p>
                )}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                  <FaCamera className="w-4 h-4" />
                  Profile Photo URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="photo"
                    placeholder="https://example.com/photo.jpg"
                    className={`w-full px-4 py-3 pl-12 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      error.photo ? "border-red-500" : "border-gray-600"
                    }`}
                    disabled={isLoading}
                  />
                  <FaCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {error.photo && (
                  <p className="mt-2 text-sm text-red-400">{error.photo}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                  <FaLock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      error.password ? "border-red-500" : "border-gray-600"
                    }`}
                    disabled={isLoading}
                  />
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {error.password && (
                  <p className="mt-2 text-sm text-red-400">{error.password}</p>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-gray-400 font-medium">
                    Password must contain:
                  </p>
                  <div className="space-y-1">
                    {[
                      { key: "length", text: "At least 6 characters" },
                      { key: "lowercase", text: "One lowercase letter" },
                      { key: "uppercase", text: "One uppercase letter" },
                      { key: "number", text: "One number" },
                    ].map((req) => (
                      <div key={req.key} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            passwordRequirements[req.key]
                              ? "bg-green-500"
                              : "bg-gray-700"
                          }`}
                        >
                          {passwordRequirements[req.key] && (
                            <FaCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordRequirements[req.key]
                              ? "text-green-400"
                              : "text-gray-500"
                          }`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800 mt-1"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 font-semibold 
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition shadow-md rounded-lg duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your information is protected with industry-standard encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
