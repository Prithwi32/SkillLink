import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export function InstructorCard({
  name = "Sarah Wilson",
  about = "Passionate UI designer with 5+ years of experience in creating user-centered digital experiences.",
  skillsOffered = ["UI Design", "Figma", "User Research", "Prototyping"],
  photo = "/placeholder.svg?height=40&width=40",
  _id,
  rating,
}) {
  // Show only first 3 skillsOffered if there are more
  const displayBadges = skillsOffered.slice(0, 3);
  const remainingBadges = skillsOffered.length - 3;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleViewMore = (userId) => {
    if (token) navigate(`/users/${userId}`);
    else {
      toast.error("Login Required");
      scrollTo(0,0);
      navigate("/login");
    }
  };

  return (
    <Card className="w-full max-w-xs h-full overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col cursor-pointer">
      <div className="aspect-[4/1] relative bg-gradient-to-b from-slate-300 to-background flex items-center justify-center">
        <Avatar className="size-20 absolute bottom-0 translate-y-1/2 border-4 border-background">
          <AvatarImage src={photo} className="object-cover" alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="pt-10 text-center space-y-3 flex-grow">
        <div className="mb-3">
          <p className="text-xl font-semibold line-clamp-2">{name}</p>
          <div className="flex text-yellow-400 justify-center">
            {[...Array(5)].map(
              (_, i) =>
                i < rating && <Star key={i} className="size-3 fill-current" />,
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {about}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center">
          {displayBadges.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs rounded-full"
            >
              {skill}
            </Badge>
          ))}
          {remainingBadges > 0 && (
            <Badge className="text-xs rounded-full" variant="secondary">
              + {remainingBadges} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-4 mt-auto">
        <Button
          onClick={() => handleViewMore(_id)}
          size="sm"
          className="w-28 bg-blue-950 hover:opacity-90 hover:bg-blue-950"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
