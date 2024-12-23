// AuthContext.jsx
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

      // Decode the JWT token to extract the user ID
      const decoded = jwtDecode(jwtToken);
      const userId = decoded._id;
      // console.log(userId);

      setToken(jwtToken);
      setUser(name, email);
      setUserId(userId);
      // console.log(jwtToken);
      localStorage.setItem("token", jwtToken); // Store JWT token
      return { token: jwtToken, user: { name, email } };
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
      value={{ backendUrl, user, userId, token, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
