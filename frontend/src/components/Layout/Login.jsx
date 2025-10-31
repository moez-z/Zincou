import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import login from "../../assets/register.webp";
import Register from "./Register";

const Login = ({ setLoginModalOpen, loginModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleShowRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-white flex items-center justify-center z-50 min-h-screen">
      <div className="bg-white shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row md:h-[600px] relative rounded-lg">
        {/* Close Button */}
        <button
          onClick={() => setLoginModalOpen && setLoginModalOpen(false)}
          className="absolute top-4 right-4 z-30 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close login"
        >
          <IoMdClose size={24} className="text-gray-600" />
        </button>

        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <h2 className="text-2xl font-bold">ZinCou</h2>
            </div>
            <h2 className="text-3xl font-bold text-center mb-3">Hey there!</h2>
            <p className="text-center text-gray-600 mb-8">
              Enter your email and password to login
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-sm font-medium">
                  {typeof error === "object"
                    ? error.message || "Invalid email or password"
                    : error}
                </p>
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="you@example.com"
                disabled={loading}
                required
                aria-label="Email address"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={handleShowRegister}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                type="button"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 z-10"></div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12 text-white">
            <h2 className="text-5xl font-bold mb-6 text-center leading-tight">
              Welcome to
              <br />
              ZinCou
            </h2>
            <p className="text-lg max-w-md text-center mb-10 leading-relaxed opacity-90">
              Your gateway to exceptional fashion and style. Login to explore
              our latest collections.
            </p>
            <div className="flex space-x-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white shadow-lg"></span>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/50"></span>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/50"></span>
            </div>
          </div>
          <img
            src={login}
            alt="Fashion showcase"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
