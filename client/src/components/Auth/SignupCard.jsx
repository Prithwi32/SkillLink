import { useState } from "react";
import { HobbyInput } from "../HobbyInput";
import { InputField } from "../InputField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function SignupCard() {
  const {backendUrl} = useAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    skillsOffered: [], // State for skills offered
    skillsRequired: [], // State for skills required
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes for regular fields
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

  // Handle changes for skills offered
  const handleSkillsOfferedChange = (newSkills) => {
    setFormData({ ...formData, skillsOffered: newSkills });
  };

  // Handle changes for skills required
  const handleSkillsRequiredChange = (newSkills) => {
    setFormData({ ...formData, skillsRequired: newSkills });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure passwords match before proceeding
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    // Log the form data to ensure it's structured correctly
    console.log('Form Data:', formData);
  
    try {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          skillsOffered: Array.isArray(formData.skillsOffered) ? formData.skillsOffered : [formData.skillsOffered],
          skillsRequested: Array.isArray(formData.skillsRequired) ? formData.skillsRequired : [formData.skillsRequired],
        }),
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed");
      }
      toast.success("Signup successful");
      navigate("/login");
      console.log("Signup successful", responseData);
      // handle successful signup (e.g., redirect to login)
    } catch (error) {
      toast.error("SignUp Failed!")
      console.error('Error during signup:', error);
      setErrorMessage(error.message || "Signup failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="auth_bg_img"
        className="fixed top-0 z-0 opacity-75 w-full h-screen object-cover"
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

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Skills Offered Input */}
          <HobbyInput
            selectedHobbies={formData.skillsOffered}
            onChange={handleSkillsOfferedChange} // Handle change for skills offered
            title={"Skills Offered"}
            placeholderTitle={"Skills"}
          />

          {/* Skills Requested Input */}
          <HobbyInput
            selectedHobbies={formData.skillsRequired}
            onChange={handleSkillsRequiredChange} // Handle change for skills required
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
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
