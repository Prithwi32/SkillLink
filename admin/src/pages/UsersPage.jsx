import React, { useContext, useEffect, useState } from "react";
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";
import { User, UserX2 } from "lucide-react";
import UserCard from "@/components/users/UserCard";
import ReportModal from "@/components/users/ReportModal";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("reported");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { backendUrl } = useContext(AdminContext);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReasonsLoading, setIsReasonsLoading] = useState(false);
  const [reasons, setReasons] = useState([]);

  const getAllReportedUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/report-user/reported"
      );
      if (data.success) {
        setReportedUsers(data.reportedUsers);
      } else {
        toast.error("Failed to fetch reported users");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch reported users");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllBannedUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/report-user/blocked");
      if (data.success) {
        setBannedUsers(data.bannedUsers);
      } else {
        toast.error("Failed to fetch banned users");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch banned users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab == "reported") {
      getAllReportedUsers();
    } else {
      getAllBannedUsers();
    }
  }, [activeTab]);

  const getAllReasons = async (user) => {
    setIsReasonsLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/report-user/reasons/${user.userId}`
      );
      if (data.success) {
        setReasons(data.reasons);
      } else {
        toast.error("Failed to fetch reasons");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch reasons");
    } finally {
      setIsReasonsLoading(false);
    }
  };

  const handleViewReason = (user) => {
    getAllReasons(user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBlock = async (user) => {
    // confirm the admin sure want to delete
    const isConfirmed = window.confirm(
        `Are you sure you want to block ${user.name}?`,
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const { data } = await axios.put(
        backendUrl + `/api/report-user/block/${user.userId}`
      );

      if (data.success) {
        toast.success(data.message);
        getAllReportedUsers();
      } else {
        toast.error(`Failed to block user ${user.name}`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(`Failed to block user ${user.name}`);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Hero section placeholder */}
      <div className="bg-blue-800 text-white py-6 mt-6">
        <div className="flex flex-col justify-center items-center px-4">
          <h1 className="text-3xl text-center font-bold">
            User Management Dashboard
          </h1>
          <p className="mt-3 text-sm text-center text-blue-100">
            Monitor and manage user reports and blocks
          </p>
        </div>
      </div>

      <div className=" px-4 py-8">
        {/* Tab buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("reported")}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "reported"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            Reported Users
          </button>
          <button
            onClick={() => setActiveTab("blocked")}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "blocked"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <UserX2 className="w-5 h-5 mr-2" />
            Blocked
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "reported"
            ? !isLoading &&
              reportedUsers.map((user) => (
                <UserCard
                  key={user.userId}
                  user={user}
                  onViewReason={() => handleViewReason(user)}
                  onBlock={() => handleBlock(user)}
                  type="reported"
                />
              ))
            : !isLoading &&
              bannedUsers.map((user) => (
                <UserCard key={user._id} user={user} type="blocked" />
              ))}
        </div>
        {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        reasons={reasons}
        isReasonsLoading={isReasonsLoading}
      />
    </div>
  );
}
