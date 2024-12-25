import { Mail, Calendar } from "lucide-react";
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

const blockedUsers = [
  {
    id: "1",
    name: "William",
    email: "william@example.com",
    requestDate: "2023-12-04",
    skills: ["JavaScript", "React", "Node.js"],
    status: "blocked",
    reason: "Inappropriate behavior",
    description:
      "User has been reported for using offensive language in the community forum.",
  },
  {
    id: "2",
    name: "john",
    email: "john@example.com",
    requestDate: "2023-12-03",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    status: "blocked",
    reason: "Spam content",
    description:
      "User has been reported for posting excessive promotional content.",
  },
  // Add more sample data as needed
];

export function BlockedUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isReasonFormOpen, setIsReasonFormOpen] = useState(false);

  const { backendUrl } = useContext(AdminContext);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    getAllBannedUsers();
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
          bannedUsers.length > 0 &&
          bannedUsers.map((user) => (
            <Card key={user._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="text-sm font-bold mb-3">
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mt-5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground text-gray-700">
                    {user.email}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex-1 justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="pl-5 pr-5 w-[48%] bg-purple-600 text-white hover:text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => handleReasonClick(user)}
                  >
                    View Reason
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      {!isLoading && bannedUsers.length === 0 && (
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
        />
      )}
    </>
  );
}
