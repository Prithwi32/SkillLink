import {
  ArrowRightLeftIcon,
  Rocket,
  Search,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import landingPageImage from "../../assets/Images/landingPageImage.png";

export default function AnimatedAbout() {
  return (
    <div className="h-full bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Hero Section */}
      <div className="px-8">
        <div className="flex flex-col py-6 md:py-2 md:flex-row items-center justify-around gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-6 max-md:text-center md:p-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-800 leading-tight">
              Welcome to Our{" "}
              <br className="hidden md:block" />
              Platform
            </h1>
            <p className="text-gray-600 text-lg w-full">
              Discover a platform where skills are shared, communities connect,
              and growth is a collaborative journey. Learn, teach, and thrive
              together.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#features">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                  GET STARTED
                </button>
              </a>
              <a href="#skills">
                <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-4 py-3 rounded-full font-medium transition-colors">
                  <Search className="w-5 h-5" />
                  EXPLORE
                </button>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src={landingPageImage}
              alt="Developer working"
              className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 pt-16">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <ArrowRightLeftIcon className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Skill Exchange
            </h3>
            <p className="text-gray-600">
              Share your expertise and learn new skills from community members.
              Every interaction is an opportunity for growth.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Global Community
            </h3>
            <p className="text-gray-600">
              Connect with people from all over the world and expand your
              horizons through meaningful interactions and shared experiences.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Rocket className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">
              Collaborative Growth
            </h3>
            <p className="text-gray-600">
              Grow together through knowledge sharing and collaborative
              projects. Success is better when it's shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
