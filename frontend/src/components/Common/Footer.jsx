import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandFacebook } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Handle form submission
    setError("");
    setEmail("");
    // Add your newsletter signup logic here
  };

  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Newsletter Section */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            NewsLetter
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Officia proident laboris velit et minim cillum aliqua enim cillum
            irure est mollit aute
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Officia proident laboris velit et minim cillum
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800 transition-all"
              >
                Subscribe
              </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </form>
        </div>

        {/* Shop Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com/profile.php?id=61561802430145"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Facebook"
            >
              <TbBrandFacebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/zincou_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Twitter"
            >
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm text-gray-500 mb-2">Call Us</p>
          <a
            href="tel:+21620545464"
            className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FiPhoneCall className="mr-2" />
            +216 20 545 464
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto mt-12 px-4 lg:px-8 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm text-center">
          ZinCou.tu © 2024-2025, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
