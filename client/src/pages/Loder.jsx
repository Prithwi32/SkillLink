import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="w-44 h-44" viewBox="0 0 240 240">
        <circle 
          className="animate-ringA stroke-[#6366f1] fill-none stroke-[15] stroke-round"
          cx="120"
          cy="120"
          r="105"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
        />
        <circle 
          className="animate-ringB stroke-[#22c55e] fill-none stroke-[15] stroke-round"
          cx="120"
          cy="120"
          r="35"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
        />
        <circle 
          className="animate-ringC stroke-[#ec4899] fill-none stroke-[15] stroke-round"
          cx="85"
          cy="120"
          r="70"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
        <circle 
          className="animate-ringD stroke-[#eab308] fill-none stroke-[15] stroke-round"
          cx="155"
          cy="120"
          r="70"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loader;