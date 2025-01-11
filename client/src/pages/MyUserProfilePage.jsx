import { useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MyUserProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(section);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />
      <main className="flex-grow sm:p-8 p-5">
        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {/* Render nested routes */}
        <Outlet />
      </main>
    </div>
  );
}