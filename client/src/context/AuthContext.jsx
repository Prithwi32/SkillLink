// AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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
      const { token, user } = await response.json();
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token); // Store JWT token
      return { token, user };
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ backendUrl, user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};