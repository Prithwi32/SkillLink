import { Calendar, MapPinIcon, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

const EventCarousel = ({ topEvents }) => {
  console.log(topEvents);

  function formatDate(inputDate) {
    // Split the input date into components
    const [day, month, year] = inputDate.split("/").map(Number);
    
    // Create a new Date object
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    
    // Format the date
    const options = {
      weekday: "short", // Short day of the week (e.g., Wed)
      month: "short",   // Short month name (e.g., Oct)
      day: "2-digit",   // Two-digit day (e.g., 17)
      year: "numeric",  // Full year (e.g., 2028)
    };
    
    // Use Intl.DateTimeFormat for formatting
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  

  return (
    <div className="flex w-full flex-wrap items-center justify-center cursor-pointer gap-5">
      {topEvents.slice(0, 3).map((event, index) => (
          <Card key={index} className="p-6 white rounded-3xl shadow-blue-100 border border-blue-100 shadow-md lg:max-w-md w-full hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.01] transition-all">
           <CardContent className="p-0 space-y-3">
              {/* Date and Time */}
              <div className="text-sm text-gray-400 flex items-center gap-2">
               <Calendar className="size-4"/> {formatDate(event.date)}
              </div>

              {/* Event Title and Description */}
              <h2 className="text-2xl font-semibold line-clamp-2 text-blue-900">
                {event.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 line-clamp-3">
                {event.description}
              </div>

              {/* skills taught */}
              <div className="flex flex-wrap gap-2">
                {event.badges.slice(0,3).map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs text-blue-900"
                >
                  {badge}
                </Badge>
              ))}

              {event.badges.length>3 && <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs text-blue-900"
                >
                  +{event.badge.length-3} more
                </Badge>}
              </div>

              {/* owner Section */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <Avatar className="size-8">
                    <AvatarImage src={event.mentorImage} className="object-cover" alt="GammaTester" />
                    <AvatarFallback>GT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-700">{event.mentorName}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
            </CardContent>
          </Card>
      ))}
    </div>
  );
};

export default EventCarousel;
