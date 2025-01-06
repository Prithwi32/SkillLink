import React, { useContext, useEffect, useState } from "react";
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";
import { Check, X } from "lucide-react";
import axios from "axios";
import { AdminContext } from "@/context/AdminContext";
import generalSkillImage from "../assets/generalSkillImage.avif";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function SkillsDashboard() {
  const [activeTab, setActiveTab] = useState("approved");

  const { backendUrl } = useContext(AdminContext);
  const [approvedSkills, setApprovedSkills] = useState([]);
  const [pendingSkills, setPendingSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApprovedSkills = async () => {
    try {
      setIsLoading(true);
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

  const getPendingSkills = async () => {
    try {
      setIsLoading(true);
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
      toast.error(error.message || "Failed to get pending skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "approved") {
      getApprovedSkills();
    } else {
      getPendingSkills();
    }
  }, [activeTab]);

  const handleAccept = async (skill) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/admin/skills/approve/${skill._id}`
      );
      if (data.success) {
        toast.success(`Skill ${skill.name} approved`);
        getPendingSkills();
      } else {
        toast.dismiss();
        toast.error(`Failed to approve skill ${skill.name}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.message || `Failed to approve skill ${skill.name}`);
    }
  };

  const handleReject = async (skill) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/admin/skills/reject/${skill._id}`
      );
      if (data.success) {
        toast.success(`Skill ${skill.name} rejected`);
        getPendingSkills();
      } else {
        toast.dismiss();
        toast.error(`Failed to reject skill ${skill.name}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.message || `Failed to reject skill ${skill.name}`);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="h-16 bg-blue-800 mb-8 py-8 mt-5">
        <div className=" px-4 h-full flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Skills Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Tab buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "approved"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "review"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            In Review
          </button>
        </div>

        {/* Table section */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-5">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Skill Name
                    </th>
                    <th
                      className={`${activeTab == "review" ? "hidden sm:block" : ""} px-6 py-4 text-left text-sm font-semibold text-gray-600`}
                    >
                      Description
                    </th>
                    {activeTab === "review" && (
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(activeTab === "approved"
                    ? approvedSkills
                    : pendingSkills
                  ).map((skill) => (
                    <tr
                      key={skill._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              skill.photo.trim() == ""
                                ? generalSkillImage
                                : skill.photo
                            }
                            alt={skill.name}
                            className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                            draggable="false"
                          />
                          <span className="font-medium text-gray-900">
                            {skill.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`${activeTab == "review" ? "hidden sm:block" : ""} px-6 py-4 text-gray-600`}
                      >
                        {skill.desc}
                      </td>
                      {activeTab === "review" && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleAccept(skill)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  aria-label="Accept"
                                >
                                  <Check size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Accept</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleReject(skill)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  aria-label="Reject"
                                >
                                  <X size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
