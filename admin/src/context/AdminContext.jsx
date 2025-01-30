import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendUrl = "http://localhost:5000";

  // Use environment variable
  // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const checkAuth = async () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/auth/check-auth"
      );

      if (data.success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/auth/logout");

      if (data.success) {
        setIsLoggedIn(false);
        toast.success("Logged out");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    backendUrl,
    isLoading,
    isLoggedIn,
    checkAuth,
    setIsLoggedIn,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
