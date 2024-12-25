import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, ChevronRight, User, Clock, Users } from "lucide-react";

const EnhancedEventCard = ({
  title,
  date,
  description,
  mentorImage,
  mentorName,
  rating = 0,
  skills = [],
  participantsCount,
  maxParticipants,
  startTime,
  endTime,
  status,
  onShowMore,
}) => {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-white mb-1">
              {title || "Untitled Event"}
            </CardTitle>
            <CardDescription className="text-sm text-white/80">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {date}
              </span>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={mentorImage}
            alt={mentorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{mentorName}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {startTime} - {endTime}
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {participantsCount}/{maxParticipants}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-white flex justify-center">
        <button
          onClick={onShowMore}
          className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default EnhancedEventCard;
