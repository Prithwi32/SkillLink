import { createContext, useContext, useState } from "react";
import axios from "axios";
import {jwtDecode }from "jwt-decode";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(null);

  // Signup function
  const signup = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Signup failed");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error during signup:", error.message);
      throw error;
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Login failed");
      const { name, email, jwtToken } = await response.json();
  
      const decoded = jwtDecode(jwtToken); // Decode token
      const userId = decoded._id; // Extract user ID
  
      console.log("Decoded Token:", decoded);
      console.log("User ID:", userId);
  
      setToken(jwtToken);
      setUser(name, email);
      setUserId(userId); // Set userId
      localStorage.setItem("user", name);
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", jwtToken); // Store token
  
      return { token: jwtToken, user: { name, email, userId } };
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };
  

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ backendUrl, user, userId, token,setToken, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
