import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login.webp";
import { IoMdClose } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = ({
  showRegister,
  setShowRegister,
  loginModalOpen,
  setLoginModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [numeroPhone, setNumeroPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, location.state, setLoginModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email,
        password,
        firstName,
        lastName,
        address,
        numeroPhone,
      })
    );
  };

  const handleClose = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const handleShowLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-center z-50 min-h-screen">
      <div className="bg-white shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row md:h-auto relative rounded-lg my-4">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close registration"
        >
          <IoMdClose size={24} className="text-gray-600" />
        </button>

        {/* Left Side: Register Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 overflow-y-auto max-h-screen">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex justify-center mb-4">
              <h2 className="text-2xl font-bold">ZinCou</h2>
            </div>
            <h3 className="text-3xl font-bold text-center mb-3">Hey there!</h3>
            <p className="text-center text-gray-600 mb-6">
              Enter your details to create an account
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-sm font-medium">
                  {typeof error === "object"
                    ? error.message || "Registration failed. Please try again."
                    : error}
                </p>
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              {/* First Name & Last Name - Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="Fname"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="Fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="John"
                    disabled={loading}
                    required
                    aria-label="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Lname"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="Lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Doe"
                    disabled={loading}
                    required
                    aria-label="Last name"
                  />
                </div>
              </div>

              <div>
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                  aria-label="Email address"
                />
              </div>

              <div>
                <label
                  htmlFor="numeroPhone"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="numeroPhone"
                  value={numeroPhone}
                  onChange={(e) => setNumeroPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="+216 "
                  disabled={loading}
                  required
                  aria-label="Phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold mb-2 text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="123 Main St, City, Country"
                  disabled={loading}
                  required
                  aria-label="Address"
                />
              </div>

              <div>
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-12"
                    placeholder="Create a strong password"
                    disabled={loading}
                    required
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Footer Section */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleShowLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                type="button"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 z-10"></div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12 text-white">
            <h2 className="text-5xl font-bold mb-6 text-center leading-tight">
              Join ZinCou
              <br />
              Today
            </h2>
            <p className="text-lg max-w-md text-center mb-10 leading-relaxed opacity-90">
              Create an account to discover our exclusive collections and enjoy
              personalized shopping experiences.
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

export default Register;
