import { AdminContext } from "@/context/AdminContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const Users = () => {
  const { backendUrl } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intialCount, setInitialCount] = useState(8);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(backendUrl + "/api/user/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        if (data.users) {
          setUsers(data.users);
        }
      } catch (err) {
        setError("An error occurred while fetching users.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-8 h-full bg-gradient-to-br from-slate-100 to-background mt-5 pt-14" id="users">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-5 text-center">
        Our <span className="text-blue-800">Site</span> Users
      </h1>
      <p className="text-gray-500 sm:text-lg mx-auto max-w-lg text-center mb-6">
        Manage and explore all registered users. Identify connections, oversee
        activity, and foster a thriving community.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {!isLoading &&
          users.slice(0, intialCount).map((instructor, index) => (
            <Card  key={index} className="w-full max-w-xs h-full overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col cursor-pointer">
              <div className="aspect-[4/1] relative bg-gradient-to-b from-slate-300 to-white flex items-center justify-center">
                <Avatar className="size-20 absolute bottom-0 translate-y-1/2 border-4 border-background">
                  <AvatarImage
                    src={instructor.photo}
                    className="object-cover"
                    alt={instructor.name}
                  />
                  <AvatarFallback>
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <CardContent className="pt-10 text-center bg-white space-y-3 flex-grow">
                <div className="mb-3">
                  <p className="text-xl font-semibold line-clamp-2">
                    {instructor.name}
                  </p>
                  <div className="flex text-yellow-400 justify-center">
                    {[...Array(5)].map(
                      (_, i) =>
                        i < instructor.rating && (
                          <Star key={i} className="size-3 fill-current" />
                        )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {instructor.about}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {instructor.skillsOffered.slice(0, 4).map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {instructor.skillsOffered.length > 4 && (
                    <Badge className="text-xs rounded-full" variant="secondary">
                      + {instructor.skillsOffered.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        )}
      {!isLoading && intialCount < users.length && (
        <div className="w-full flex justify-center mt-6">
          {" "}
          <Button size="sm" className="bg-slate-800 hover:opacity-90 hover:bg-slate-800" onClick={()=>setInitialCount(users.length)}>Show More</Button>
        </div>
      )}
    </div>
  );
};

export default Users;
