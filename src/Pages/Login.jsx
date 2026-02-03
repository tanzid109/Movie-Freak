import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const Login = () => {
    const { userLogin, setUser, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginGoogle = async () => {
        setIsGoogleLoading(true);
        setError("");

        try {
            const result = await googleLogin();
            const user = result.user;
            setUser(user);
            navigate(location?.state ? location.state : "/");
        } catch (err) {
            setError("Google login failed. Please try again.");
            console.error("Google login error:", err);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        try {
            const result = await userLogin(email, password);
            const user = result.user;
            setUser(user);
            navigate(location?.state ? location.state : "/");
        } catch (err) {
            // User-friendly error messages
            switch (err.code) {
                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;
                case "auth/user-disabled":
                    setError("This account has been disabled");
                    break;
                case "auth/user-not-found":
                    setError("No account found with this email");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password");
                    break;
                case "auth/too-many-requests":
                    setError("Too many failed attempts. Please try again later");
                    break;
                default:
                    setError("Login failed. Please check your credentials");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <Navbar />

            <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">
                            Sign in to access your movie collection
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-8">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                                <p className="text-red-400 text-center font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
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
                                        className="w-full px-4 py-3 pl-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                        <FaLock className="w-4 h-4" />
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 pl-12 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 font-bold rounded-lg
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-1 border-t border-gray-700"></div>
                            <span className="px-4 text-sm text-gray-500">OR</span>
                            <div className="flex-1 border-t border-gray-700"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleLoginGoogle}
                            disabled={isGoogleLoading || isLoading}
                            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isGoogleLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <FcGoogle className="text-xl" />
                                    Sign in with Google
                                </>
                            )}
                        </button>

                        {/* Register Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Your data is securely encrypted and never shared with third parties.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;