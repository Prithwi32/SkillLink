import React from 'react';
import { Calendar, Ban, CheckCircle } from 'lucide-react';

export default function SessionFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { status: 'upcoming', label: 'Upcoming', icon: <Calendar size={18} /> },
    { status: 'completed', label: 'Completed', icon: <CheckCircle size={18} /> },
    { status: 'canceled', label: 'Canceled', icon: <Ban size={18} /> },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {filters.map(({ status, label, icon }) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${activeFilter === status
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }
          `}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
