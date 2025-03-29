import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const [allitems, setAllitems] = useState();

  const { blogs } = useAuth();

  console.log(blogs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-white mb-16 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Lost & Found Hub for
              <br />
              <span className="text-yellow-300">Campus Community</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Connecting lost items with their owners through our trusted campus
              network
            </p>
            <div className="flex gap-4">
              <Link to={"/lostItem"} className="bg-white/10 backdrop-blur-lg px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                Report Lost Item
              </Link>
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all duration-300">
                Browse Found Items
              </button>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  1.2K+
                </div>
                <div className="text-gray-600">Successful Reunions</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-green-100 rounded-2xl">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  89%
                </div>
                <div className="text-gray-600">Recovery Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-purple-100 rounded-2xl">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-1">
                  650+
                </div>
                <div className="text-gray-600">Active Listings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Items Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recently Found Items
          </h2>
          <div className="grid gap-8 sm:2 md:grid-cols-3 lg:grid-cols-5">
            {blogs.map((item) => (
              <div
                key={item}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {console.log(item?.image?.url)}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item?.image?.url}
                    alt="Found item"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* Recent Items Section */}
<div className="mb-16">
  <h2 className="text-3xl font-bold text-gray-900 mb-8">
    Recently Found Items
  </h2>
  <div className="grid gap-8 sm:2 md:grid-cols-3 lg:grid-cols-5">
    {blogs.map((item, index) => (
      <div
        key={index}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={item?.image?.url}
            alt="Found item"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category & Status Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {item?.category || "Unknown Category"}
          </h3>
          <p
            className={`text-sm font-medium ${
              item?.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item?.status || "Status Unknown"}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Found Someone's Belonging?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Help reunite lost items with their owners
          </p>
          <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300">
            Report Found Item
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Campus L&F. All rights reserved. Crafted with ♡ for students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
