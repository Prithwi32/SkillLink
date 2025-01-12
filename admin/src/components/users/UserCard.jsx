import React from "react";
import { Shield, AlertCircle } from "lucide-react";

const UserCard = ({ user, type, onViewReason, onBlock }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="p-6">
        <div className="flex items-center">
          <img
            src={
              user.photo == ""
                ? "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                : user.photo
            }
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {type === "reported" && (
              <p className="text-sm text-red-500 mt-1">
                Reports: {user.reportCount}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {type === "reported" && (
            <>
              <button
                onClick={onViewReason}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                View Reason
              </button>
              <button
                onClick={onBlock}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <Shield className="w-4 h-4 mr-2" />
                Block
              </button>
            </>
          )}
          {type === "blocked" && (
            <div className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
              <Shield className="w-4 h-4 mr-2" />
              Blocked User
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
