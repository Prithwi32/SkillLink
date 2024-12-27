import { useEffect, useState } from "react";
import axios from "axios";
import { ProfilePage } from "../../pages/ProfilePage";
import { useAuth } from "@/context/AuthContext";

function ProfileSection() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { backendUrl, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/user/get/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User ID not found in local storage.");
        setError(error);
      }
    };
    fetchUserData();
  }, [backendUrl, token]);

  const handleEditToggle = (editing) => {
    setIsEditing(editing);
  };

  const handleSubmit = async (updatedUser) => {
    try {
      const userId = localStorage.getItem("userId");
      const formData = new FormData();

      // Append basic fields
      formData.append("name", updatedUser.name);
      formData.append("about", updatedUser.about);

      // Serialize skills arrays into JSON strings
      formData.append(
        "skillsOffered",
        JSON.stringify(updatedUser.skillsOffered),
      );
      formData.append(
        "skillsRequested",
        JSON.stringify(updatedUser.skillsRequested),
      );

      // Append photo only if it's a File instance
      if (updatedUser.photo instanceof File) {
        formData.append("photo", updatedUser.photo);
      }

      // Debugging log for form data
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.put(
        `${backendUrl}/api/user/edit/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <ProfilePage
      user={user}
      isEditing={isEditing}
      onEditToggle={handleEditToggle}
      onSubmit={handleSubmit}
    />
  );
}

export default ProfileSection;
