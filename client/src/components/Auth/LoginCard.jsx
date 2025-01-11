import { useState } from "react";
import { InputField } from "../HelperComponents/InputField";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="auth_bg_img"
        className="absolute z-0 opacity-75 w-full h-full object-cover"
      />
      <div className="absolute inset-0"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-blue-100">Welcome back to our community</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg 
                     font-semibold shadow-md hover:from-blue-700 hover:to-indigo-800 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
