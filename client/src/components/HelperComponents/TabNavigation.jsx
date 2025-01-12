import React from 'react';
import { Calendar, Ban, CheckCircle } from 'lucide-react';

export function TabNavigation({ activeTab, onTabChange }) {
  const tabs = ['Scheduled', 'Completed', 'Cancelled'];

  return (
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-6">
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
            {tab === 'Scheduled' ? <Calendar size={18} /> : 
              tab === 'Completed' ? <CheckCircle size={18} /> :
              <Ban size={18} />
            }

          </button>
        ))}
      </div>
  );
}
