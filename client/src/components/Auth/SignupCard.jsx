import { useState } from "react";
import { InputField } from "../HelperComponents/InputField";
import SkillSuggest from "@/components/HelperComponents/SkillSuggestionForEventCreation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SignupImage from "../../assets/signupPage.png";

export function SignupCard() {
  const { backendUrl } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    skillsOffered: [],
    skillsRequired: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      if (formData.password !== value) {
        setErrorMessage("Passwords do not match");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSkillsOfferedChange = (newSkills) => {
    setFormData({ ...formData, skillsOffered: newSkills });
  };

  const handleSkillsRequiredChange = (newSkills) => {
    setFormData({ ...formData, skillsRequired: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          skillsOffered: Array.isArray(formData.skillsOffered)
            ? formData.skillsOffered
            : [formData.skillsOffered],
          skillsRequested: Array.isArray(formData.skillsRequired)
            ? formData.skillsRequired
            : [formData.skillsRequired],
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed");
      }
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error("Signup Failed!");
      console.error("Error during signup:", error);
      setErrorMessage(
        error.message || "Signup failed. Please try again later.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 lg:p-0 relative">
      <div className="w-full max-w-screen-2xl flex overflow-hidden">
        {/* Left side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
          <div className="w-full md:max-w-md">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-semibold mx-auto lg:mx-0">
                Hobby<span className="text-blue-700">Verse</span>
              </span>
            </div>

            {/* Welcome Text */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 text-center lg:text-start">
                Create Account
              </h1>
              <p className="text-gray-600 text-center lg:text-start">
                Join our skill exchange community
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Skills you can offer
                </label>
                <SkillSuggest
                  onSkillSelect={handleSkillsOfferedChange}
                  isMultiple={true}
                  existingSkills={formData.skillsOffered}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Skills you want to learn
                </label>
                <SkillSuggest
                  onSkillSelect={handleSkillsRequiredChange}
                  isMultiple={true}
                  existingSkills={formData.skillsRequired}
                />
              </div>

              <p className="text-gray-600 text-sm text-center sm:text-start">
                Connect with like-minded individuals, exchange skills, and
                unlock endless possibilities.
              </p>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Sign up
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  onClick={()=>scrollTo(0,0)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-50">
          <img
            src={SignupImage}
            alt="People collaborating"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
