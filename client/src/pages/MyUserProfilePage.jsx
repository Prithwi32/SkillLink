import { useState } from 'react';
import Sidebar from '@/components/profile/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 relative">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full transition-all duration-300">
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="mt-14 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
