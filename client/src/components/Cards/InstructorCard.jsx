import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRandomColor } from "@/constants/colors";

export function InstructorCard({
  name,
  photo,
  _id,
  rating,
  about,
  skillsOffered,
  className,
}) {
  // Show only first 3 skillsOffered if there are more
  const displayBadges = skillsOffered.slice(0, 2);
  const remainingBadges = skillsOffered.length - 2;

  const bg = getRandomColor();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleViewMore = (userId) => {
    if (token) navigate(`/users/${userId}`);
    else {
      toast.error("Login Required...");
      navigate("/login");
    }
  };

  return (
    <Card
      className={cn(
        "w-full max-w-md transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer ",
        className,
      )}
    >
      <CardContent className="pt-6 flex flex-col h-full justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-16">
            <AvatarImage src={photo} className="object-cover" alt={name} />
            <AvatarFallback className={`${bg} text-white font-semibold`}>
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold leading-none text-xl ">
                {name}
              </h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-semibold text-muted-foreground">
                  {rating}
                </span>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-gray-600 text-muted-foreground">
              {about}
            </p>
            <div className="flex flex-wrap gap-2">
              {displayBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs text-blue-900"
                >
                  {badge}
                </Badge>
              ))}
              {remainingBadges > 0 && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs text-blue-900"
                >
                  +{remainingBadges} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-end">
          <Button onClick={() => handleViewMore(_id)} className="scale-90">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
