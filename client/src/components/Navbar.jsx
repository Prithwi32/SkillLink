import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const { user, token } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // This effect will run whenever the token changes
    // It's here to force a re-render when the auth state changes
  }, [token]);

  const isUserDashboard = location.pathname === "/userDashboard";

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-300 transition-colors"
          >
            HobbeyVerse
          </Link>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex space-x-6">
          {isUserDashboard ? (
            <>
              <Link
                to="/events"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Events
              </Link>
              <Link
                to="/users"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Users
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                About Us
              </Link>
              <Link
                to="/blogs"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Blogs
              </Link>
              <Link
                to="/events"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Events
              </Link>
              <Link
                to="/users"
                className="hover:text-blue-300 hover:underline transition duration-300"
              >
                Users
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <Link
                to="/userDashboard"
                className="flex items-center space-x-2 hover:text-blue-300 transition duration-300"
              >
                <UserCircle size={24} />
                <span>{user?.username || "Profile"}</span>
              </Link>
            </>
          ) : (
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-800 hover:shadow-lg text-white px-4 py-2 rounded-lg transition-all"
            >
              Sign Up / Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              // Add toggle functionality for the mobile menu
              alert("Implement mobile menu toggle");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
