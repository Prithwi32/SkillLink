import { InstructorCard } from "@/components/Cards/InstructorCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Recommanded Users
        </h1>
        {!isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((instructor, index) => (
            <InstructorCard {...instructor} key={index} />
          ))}
        </div>}
        {isLoading && (
          <div className="text-center font-semibold text-slate-400">Loading...</div>
        )}
      </main>
    </>
  );
};

export default AllSuggestedLearningPage;
