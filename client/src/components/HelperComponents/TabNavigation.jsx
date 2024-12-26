import React from 'react';
import { Calendar, Ban, CheckCircle } from 'lucide-react';

export function TabNavigation({ activeTab, onTabChange }) {
  const tabs = ['scheduled', 'completed', 'canceled'];

  return (
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={` flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'scheduled' ? <Calendar size={18} /> : 
              tab === 'completed' ? <CheckCircle size={18} /> :
              <Ban size={18} />
            }

          </button>
        ))}
      </div>
  );
}
