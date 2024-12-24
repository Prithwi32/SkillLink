import UsersPage from './UsersPage';
import SkillsPage from './SkillPage';
import EventsPage from './EventsPage';
import React, { useState } from "react";
import Sidebar from '../components/Sidebar';


const App = () => {
  const [activeSection, setActiveSection] = useState('Home');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex-1">
      <Sidebar
        isOpen={isSidebarOpen}
         onClose={toggleSidebar}
         activeSection={activeSection}
         setActiveSection={setActiveSection}
       />
         
      <div
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <button
         onClick={toggleSidebar}
           className="fixed top-2 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
         </button>
        <main>
         {activeSection === 'skills' && <SkillsPage />}
         {activeSection === 'users' && <UsersPage />}
         {activeSection === 'events' && <EventsPage />}
        </main>
        
      </div>
    </div>
  );
};

export default App;
