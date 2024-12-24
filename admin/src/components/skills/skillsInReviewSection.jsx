import React, { useContext, useEffect, useState } from 'react';
import ResponsiveSkillsTable from './skillsInReviewTable';
import toast from "react-hot-toast";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";

const SkillsInReview = () => {
  const { backendUrl } = useContext(AdminContext);

  const [pendingSkills, setPendingSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPendingSkills = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/skills/pending"
      );
      if (data.success) {
        setPendingSkills(data.skills);
      } else {
        toast.dismiss();
        toast.error("Failed to get pending skills");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(error.message||"Failed to get pending skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPendingSkills();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ResponsiveSkillsTable skills={pendingSkills} isLoading={isLoading} getPendingSkills={getPendingSkills} />
        </div>
      </main>
    </div>
  );
};

export default SkillsInReview;

