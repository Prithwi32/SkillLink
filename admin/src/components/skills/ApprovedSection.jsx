import React, { useContext, useEffect, useState } from "react";
import ApprovedSkillsTable from "./ApprovedTable";
import toast from "react-hot-toast";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";

const ApprovedSkillsPage = () => {
  const { backendUrl } = useContext(AdminContext);

  const [approvedSkills, setApprovedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApprovedSkills = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/skills/approved"
      );
      if (data.success) {
        setApprovedSkills(data.skills);
      } else {
        toast.dismiss();
        toast.error("Failed to get approved skills");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to get approved skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApprovedSkills();
  }, []);

  // Sample data for demonstration
  // const approvedSkills = [
  //   { id: 1, name: 'JavaScript', description: 'Programming language for web development' },
  //   { id: 2, name: 'React', description: 'JavaScript library for building user interfaces' },
  //   { id: 3, name: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
  //   { id: 4, name: 'Python', description: 'High-level programming language for general-purpose programming' },
  //   { id: 5, name: 'Data Analysis', description: 'Inspecting, cleansing, transforming, and modeling data' },
  // ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ApprovedSkillsTable skills={approvedSkills} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default ApprovedSkillsPage;
