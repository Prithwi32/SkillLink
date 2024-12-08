import React from 'react';

export default function ProfileSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">User Profile</h2>
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h3 className="text-2xl font-semibold">John Doe</h3>
          <p className="text-gray-600">Web Developer</p>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2 text-blue-600">About Me</h4>
        <p className="text-gray-700">
          Passionate web developer with 5 years of experience in creating
          responsive and user-friendly websites. Always eager to learn new
          technologies and improve my skills.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-2 text-blue-600">Contact Information</h4>
        <p className="text-gray-700">Email: john.doe@example.com</p>
        <p className="text-gray-700">Location: New York, NY</p>
        <p className="text-gray-700">GitHub: github.com/johndoe</p>
      </div>
    </div>
  );
}

