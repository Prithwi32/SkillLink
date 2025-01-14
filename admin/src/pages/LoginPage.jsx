import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon,Loader } from "lucide-react";
import { AdminContext } from "@/context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import adminImage2 from "../assets/admin2.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });

    setIsLoading(true);

    try {
      const { data } = await axios.post(`/api/admin/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message || "Login successful");
        navigate("/home");
        setIsLoggedIn(true);
      } else {
        toast.dismiss();
        toast.error(data.message);
        console.error(data.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to login");
      console.error("Error:", error);
    }finally{
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden sm:max-w-3xl min-h-[22rem] py-3 w-full mx-5 sm:mx-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 flex-1">
          {/* Left Image Section */}
          <div className="hidden sm:block p-2 rounded">
            <img
              src={adminImage2}
              alt="admin"
              className="size-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="flex flex-col justify-around p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-[1.6rem] font-semibold mb-2">
                Admin <span className="text-indigo-700">Login</span>
              </h3>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 text-center">Manage and empower skill exchange and collaboration effortlessly</p>
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white active:scale-95 transition-all ${isLoading? "opacity-80":""}`}
              >
                {!isLoading?"Log In":<Loader className="flex items-center justify-center animate-spin"/>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
