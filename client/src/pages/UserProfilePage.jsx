import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import Reviews from '../components/HelperComponents/Reviews';

function UserProfilePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    console.log('Chat button clicked. Chat is now:', isChatOpen ? 'Closed' : 'Open');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        <UserProfile />
        <Reviews />

        {/* Chat Button */}
        <button
          onClick={handleChatToggle}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chat State Indicator */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-6 bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-700">Chat is open!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
