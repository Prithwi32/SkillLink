import React from 'react';

export function Rating({ value, className = 'text-sm' }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`${className} ${
            i < value ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
