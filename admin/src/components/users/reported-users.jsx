import { Mail, Calendar, UsersIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ReportedUserReason from "./reported-reason-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";

const requestedUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    requestDate: "2023-12-04",
    skills: ["JavaScript", "React", "Node.js"],
    status: "pending",
    reason: "Inappropriate behavior",
    description:
      "User has been reported for using offensive language in the community forum.",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    requestDate: "2023-12-03",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    status: "pending",
    reason: "Spam content",
    description:
      "User has been reported for posting excessive promotional content.",
  },
  // Add more sample data as needed
];

export function RequestedUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isReasonFormOpen, setIsReasonFormOpen] = useState(false);

  const { backendUrl } = useContext(AdminContext);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const blockUser = async (user) => {
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

  useEffect(() => {
    getAllReportedUsers();
  }, []);

  const handleReasonClick = (user) => {
    setSelectedUser(user);
    setIsReasonFormOpen(true);
  };

  const handleCloseReasonForm = () => {
    setIsReasonFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading &&
          reportedUsers.length > 0 &&
          reportedUsers.map((user) => (
            <Card key={user.userId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white ">
                <CardTitle className="text-sm font-bold mb-2">
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 mt-5">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground text-gray-700">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Report Count: {user.reportCount}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row gap-2 justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="pl-5 pr-5 w-[48%] bg-purple-700 text-white hover:text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                    onClick={() => handleReasonClick(user)}
                  >
                    View Reason
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-[48%] bg-purple-700 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                    onClick={() => blockUser(user)}
                  >
                    Block
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      {!isLoading && reportedUsers.length === 0 && (
        <p className="flex items-center justify-center font-semibold text-slate-400 pb-4">
          No banned users found
        </p>
      )}
      {isLoading && (
        <p className="flex items-center justify-center font-semibold text-slate-400 pb-4">
          Loading...
        </p>
      )}
      {isReasonFormOpen && selectedUser && (
        <ReportedUserReason
          user={selectedUser}
          onClose={handleCloseReasonForm}
          isFromReportedUser={true}
        />
      )}
    </>
  );
}
