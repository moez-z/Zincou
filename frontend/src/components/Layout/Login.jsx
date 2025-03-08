import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/register.webp";
import { IoMdClose } from "react-icons/io";
import Register from "./Register";

const Login = ({ setLoginModalOpen, loginModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user", { email, password });
  };
  const handleClose = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl  shadow-2xl overflow-hidden w-full max-w-5xl flex h-screen relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-30"
          aria-label="Close"
        >
          <IoMdClose className="h-6 w-6" />
        </button>

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
              Enter your username and password to login
            </p>
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
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={handleShowRegister}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden rounded-l-3xl shadow-2xl">
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

        {showRegister && (
          <Register
            showRegister={showRegister}
            setShowRegister={setShowRegister}
            setLoginModalOpen={setLoginModalOpen}
            loginModalOpen={loginModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
