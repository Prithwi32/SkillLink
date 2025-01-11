import { InstructorCard } from "@/components/Cards/InstructorCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllSuggestedLearningPage = () => {
  const { backendUrl } = useAuth();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsersBasedOnProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/userRecommend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Unable to get recommended users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersBasedOnProfile();
  }, []);

  return (
    <>
      <main className="px-6 py-8 h-full bg-gradient-to-br from-slate-100 to-background">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-5 text-center">
          Recommanded <span className="text-blue-800">Users</span>
        </h1>
        <p className="text-gray-500 sm:text-lg mx-auto max-w-lg text-center mb-6">
          Discover recommended users who align with your interests and goals.
          Connect and grow together!
        </p>
        {!isLoading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
            {users.map((instructor, index) => (
              <InstructorCard {...instructor} key={index} />
            ))}
          </div>
        )}
        {isLoading && (
          <div className="text-center font-semibold text-slate-400">
            Loading...
          </div>
        )}
      </main>
    </>
  );
};

export default AllSuggestedLearningPage;
