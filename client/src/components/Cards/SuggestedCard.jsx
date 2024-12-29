import React, { useEffect, useState } from "react";
import { InstructorCardGrid } from "@/components/Cards/InstructorCardGrid";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const instructors = [
  {
    name: "Lelah Nichols",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
    rating: 4.5,
    description: "Product designer with a passion for creating beautiful and functional user interfaces. Experienced in working with cross-functional teams and delivering high-quality designs.",
    badges: ["clothes", "stem"]
  },
  {
    name: "Jesus Weiss",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop&q=80",
    rating: 4.8,
    description: "Tech enthusiast and gadget lover. Always exploring new technologies and sharing knowledge with the community.",
    badges: ["headset", "gadget", "speed", "winter"]
  },
  {
    name: "Annie Rice",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&q=80",
    rating: 4.2,
    description: "Adventure seeker and nature photographer. Love exploring mountains and capturing beautiful moments.",
    badges: ["road", "mountain", "trip", "earth", "nature"]
  }
];

export default function SuggestedCard() {

  const {backendUrl}=useAuth();
  const token=localStorage.getItem("token");
  const [users,setUsers] = useState([]);
  const [isLoading,setIsLoading]=useState(true);

  const getAllUsers=async()=>{
    try {
      setIsLoading(true);
      const {data} = await axios.get(`${backendUrl}/api/user/getAll`);
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Unable to recommended users");
    }finally{
      setIsLoading(false);
    }
  }


  const getUsersBasedOnProfile=async()=>{
    try {
      setIsLoading(true);
      const {data} = await axios.get(`${backendUrl}/api/user/userRecommend`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Unable to get recommended users");
    }finally{
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    if(token){
      getUsersBasedOnProfile();
    }else{
      getAllUsers();
    }
  },[]);

  return (
    <main className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Recommanded <span className="text-blue-700">Users</span>
      </h1>
      <p className="text-gray-600 sm:text-lg max-w-lg text-center m-4">
      Discover recommended users who align with your interests and goals. Connect and grow together!
      </p>
      {!isLoading && <InstructorCardGrid instructors={users} />}
      {isLoading && (
        <p className="text-lg pb-2 font-semibold text-slate-400">Loading...</p>
      )}
    </main>
  );
}
