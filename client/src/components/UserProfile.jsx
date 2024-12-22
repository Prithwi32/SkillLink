import React, { useState } from "react";
import { Flag, Star } from "lucide-react";
import ReportUserForm from "../components/Forms/ReportUserForm"; // Assuming ReportDialog is in the same directory

const UserProfile = () => {
  const [showReportDialog, setShowReportDialog] = useState(false); // State to control popup visibility

  const user = {
    name: "Sarah Anderson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    about:
      "Full-stack developer passionate about creating meaningful applications. Love to teach and learn from others.",
    rating: 4.8,
    knownSkills: ["React", "Node.js", "Python"],
    requestedSkills: ["AWS", "GraphQL"],
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Report User Button */}
      <button
        onClick={() => setShowReportDialog(true)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors flex items-center gap-2"
      >
        <Flag className="w-5 h-5" />
        <span>Report User</span>
      </button>

      {/* Report Dialog Popup */}
      {showReportDialog && (
        <ReportUserForm onClose={() => setShowReportDialog(false)} />
      )}

      {/* User Profile */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={user.image}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{user.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{user.about}</p>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.knownSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Looking to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.requestedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-100 text-green-500 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
