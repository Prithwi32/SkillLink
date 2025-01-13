import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { InstructorCard } from "./Cards/InstructorCard";

const UsersPage = () => {
  const { backendUrl } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(backendUrl + "/api/user/getAll");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        if (data.users) {
          if(token){
            // filter except his userId
            const filteredUsers = data.users.filter(u => u._id!== userId);
            setUsers(filteredUsers);
          }else{
            setUsers(data.users);
          }
        }
      } catch (err) {
        setError("An error occurred while fetching users.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  return (
    <div className="px-6 py-8 h-full bg-gradient-to-br from-slate-100 to-background">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-5 text-center">
        Hobby<span className="text-blue-800">Verse</span> Community
      </h1>
      <p className="text-gray-500 sm:text-lg mx-auto max-w-lg text-center mb-6">
      Discover the users who align with your interests and goals. Connect and grow together!
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {users.map((instructor,index) => (
           <InstructorCard {...instructor} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;