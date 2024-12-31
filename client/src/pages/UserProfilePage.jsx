import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import Reviews from '../components/HelperComponents/Reviews';
import ChatDialog from '@/components/chat/ChatDialog';

function UserProfilePage() {

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        <UserProfile />
        <Reviews />
        <ChatDialog/>
      </div>
    </div>
  );
}

export default UserProfilePage;
