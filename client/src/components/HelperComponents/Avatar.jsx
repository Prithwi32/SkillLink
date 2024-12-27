import { useRef } from "react";
import { Camera } from "lucide-react";

export function Avatar({ src, alt = "Avatar", onUpdate, isEditing }) {
  const fileInputRef = useRef(null);

  // Handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate(file);
    }
  };

  // Handle click on the upload button
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-32 h-32">
      {/* Avatar image */}
      <img
        src={src || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"}
        alt={alt}
        className="w-full h-full rounded-full object-cover transition-all duration-300 hover:shadow-lg"
      />

      {/* Upload button */}
      {isEditing && (
      <button
        type="button"
        onClick={handleButtonClick}
        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl transform hover:scale-110"
      >
        <Camera className="w-5 h-5 text-blue-600" />
      </button>
      )}

      {/* Hidden file input */}
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
