import  { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UsersPage from './UsersPage';
import SkillsPage from './SkillPage';
import EventsPage from './EventsPage';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-grow p-8 ml-80 bg-white" >
        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {activeSection === 'skills' && <SkillsPage />}
        {activeSection === 'users' && <UsersPage />}
        {activeSection === 'events' && <EventsPage />}
        
      </main>
      
    </div>
  );
}

export default HomePage



