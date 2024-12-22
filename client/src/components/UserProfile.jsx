import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Flag, Star } from "lucide-react";
import ReportUserForm from "../components/Forms/ReportUserForm"; // Assuming ReportDialog is in the same directory

const UserProfile = () => {
  const [showReportDialog, setShowReportDialog] = useState(false); // State to control popup visibility
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/get/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUser(data.user); // Set the user data from the API response
      } catch (err) {
        console.error(err);
        navigate('/users'); // Redirect to users page on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not found.
      </div>
    );
  }

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
          src={user.profilePicture || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'} // Default image if user doesn't have one
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{user.rating.toFixed(1)}</span> {/* Format the rating to 1 decimal place */}
            </div>
          </div>

          <p className="text-gray-600 mb-4">{user.about || 'This user has not provided an about section.'}</p>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered?.map((skill) => (
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
                {user.skillsRequested?.map((skill) => (
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