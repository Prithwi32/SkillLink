import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'session', label: 'Session', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
];

export default function Sidebar({ isOpen, onClose, activeSection, setActiveSection }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose(); // Close the sidebar after logout
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    onClose(); // Close the sidebar when a button is clicked
    if (sectionId === 'home') navigate('/'); // Redirect to the home page
  };

  // return (
  //   <div
  //     className={`fixed z-10 top-0 left-0 h-full w-64 bg-blue-600 text-white transform transition-transform duration-300 ease-in-out ${
  //       isOpen ? 'translate-x-0' : '-translate-x-full'
  //     }`}
  //   >
  //     <div className="flex flex-col h-full">
  //       <button
  //         onClick={() => {
  //           navigate('/');
  //           onClose(); // Close the sidebar after navigating
  //         }}
  //         className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 mb-6 transition-colors duration-300"
  //       >
  //         HobbyVerse
  //       </button>
  //       <nav className="flex-grow">
  //         {navItems.map((item) => (
  //           <button
  //             key={item.id}
  //             onClick={() => handleSectionClick(item.id)}
  //             className={`w-full text-left py-3 px-6 hover:bg-blue-700 transition-colors duration-300 flex items-center ${
  //               activeSection === item.id ? 'bg-blue-700' : ''
  //             }`}
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
  //             </svg>
  //             {item.label}
  //           </button>
  //         ))}
  //       </nav>
  //       <button
  //         onClick={handleLogout}
  //         className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 transition-colors duration-300"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className={`fixed z-10 top-0 left-0 h-full w-64 bg-blue-100 text-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <button
          onClick={() => {
            navigate('/');
            onClose(); // Close the sidebar after navigating
          }}
          className="text-blue-600 hover:text-blue-700 font-extrabold text-xl py-4 px-6 mb-6 border-b border-gray-200 transition-colors duration-300"
        >
          <span className="text-black">Hobby</span>Verse
        </button>
        <nav className="flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              className={`w-full text-left py-3 px-6 rounded-md mb-2 flex items-center transition-colors duration-300 ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 mt-auto rounded-md shadow-lg transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
  
}
