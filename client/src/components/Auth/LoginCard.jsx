import { useState } from "react";
import { InputField } from "../HelperComponents/InputField";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/loginPage.png";
import { Eye, EyeOff } from "lucide-react";

export function LoginCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await login(formData);
      toast.success("Login successful");
      console.log("Login successful:", user);
      navigate("/userDashboard");
    } catch (error) {
      toast.error("Login Failed!");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full md:max-w-md">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-semibold mx-auto lg:mx-0">
              Skill<span className="text-blue-700">Link</span>
            </span>
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-center lg:text-start">
              Welcome back
            </h1>
            <p className="text-gray-600 text-center lg:text-start">
              Please enter your details
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="relative">
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] opacity-80 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>

            <p className="text-gray-600 text-sm text-center sm:text-start">
              Connect with like-minded individuals, exchange skills, and unlock
              endless possibilities.
            </p>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                onClick={() => scrollTo(0, 0)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-50 rounded-3xl">
        <img
          src={LoginImage}
          alt="Illustration"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
}
