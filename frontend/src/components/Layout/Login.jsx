import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import login from "../../assets/register.webp";
import Register from "./Register";

const Login = ({ setLoginModalOpen, loginModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="bg-white flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl overflow-hidden w-full h-full max-w-5xl flex h-screen md:h-auto relative">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
          >
            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">ZinCou</h2>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center mb-6">
              Enter your email and password to login
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {typeof error === "object"
                  ? error.message || "Invalid email or password"
                  : error}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email address"
                disabled={loading}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={handleShowRegister}
                className="text-blue-500 hover:underline"
                type="button"
              >
                Register
              </button>
            </p>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden rounded-3xl m-2 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-indigo-900/70 z-10"></div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome to ZinCou</h2>
            <p className="text-xl max-w-md text-center mb-10">
              Your gateway to exceptional fashion and style. Login to explore
              our latest collections.
            </p>
            <div className="flex space-x-4">
              <span className="inline-flex h-2 w-2 rounded-full bg-white"></span>
              <span className="inline-flex h-2 w-2 rounded-full bg-white/50"></span>
              <span className="inline-flex h-2 w-2 rounded-full bg-white/50"></span>
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
