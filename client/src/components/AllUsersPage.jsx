import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UsersPage = () => {
  const {backendUrl} = useAuth()
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(backendUrl + "/api/user/getAll");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        HobbeyVerse Community
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <Card
            key={user._id}
            className="hover:shadow-2xl transition-shadow duration-300 border border-blue-200 rounded-lg"
          >
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <UserCircle className="w-6 h-6" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{user.rating}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg justify-end">
              <Button
                variant="outline"
                className="w-30 gradient-button text-white"
              >
                View More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
