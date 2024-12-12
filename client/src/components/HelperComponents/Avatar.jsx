import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

export function Avatar({ src, alt, onUpdate }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate(file);
    }
  };

  return (
    <div className="relative w-32 h-32 hover-scale">
      <img
        src={src || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'}
        alt={alt}
        className="w-full h-full rounded-full object-cover transition-all duration-300 hover:shadow-lg "
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl transform hover:scale-110"
      >
        <Camera className="w-5 h-5 text-blue-600" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
