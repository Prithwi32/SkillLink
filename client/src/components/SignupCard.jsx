import React, { useState } from "react";
import { HobbyInput } from "./HobbyInput";
import { InputField } from "./InputField";

export function SignupCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    skillsOffered: [],   // State for skills offered
    skillsRequired: [],  // State for skills required
  });

  // Handle form input changes for regular fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for skills offered
  const handleSkillsOfferedChange = (newSkills) => {
    setFormData({ ...formData, skillsOffered: newSkills });
  };

  // Handle changes for skills required
  const handleSkillsRequiredChange = (newSkills) => {
    setFormData({ ...formData, skillsRequired: newSkills });
  };

  // Handle form submission (currently empty as per the request)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will go here (currently empty)
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="auth_bg_img"
        className="absolute z-0 opacity-75 w-full h-full object-cover"
      />
      <div className="absolute inset-0"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-blue-100">Join our skill exchange community</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Skills Offered Input */}
          <HobbyInput
            selectedHobbies={formData.skillsOffered}
            onChange={handleSkillsOfferedChange}  // Handle change for skills offered
            title={"Skills Offered"}
            placeholderTitle={"Skills"}
          />

          {/* Skills Requested Input */}
          <HobbyInput
            selectedHobbies={formData.skillsRequired}
            onChange={handleSkillsRequiredChange}  // Handle change for skills required
            title={"Skills Requested"}
            placeholderTitle={"Skills"}
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg 
                     font-semibold shadow-md hover:from-blue-700 hover:to-indigo-800 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Join our community of skilled individuals and start sharing your
            expertise today
          </p>
        </form>
      </div>
    </div>
  );
}
