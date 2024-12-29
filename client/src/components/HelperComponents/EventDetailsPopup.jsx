import { Calendar, MapPin, Video, Users, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EventDetailsPopup = ({ event, onClose, open }) => {
  const {
    title,
    description,
    host_name,
    host_img,
    date,
    link,
    start_time,
    end_time,
    max_participants,
    current_participants_count,
    skills,
  } = event;

  const formattedDate = new Date(date).toLocaleDateString();
  const defaultHostImage = host_img || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid";

  const convertToLocalTime = (isoTime) => {
    try {
      const date = new Date(isoTime);
      return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
      });
    } catch (error) {
      console.error("Invalid ISO format:", error);
      return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-gray-800">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-gray-700">{description}</p>

          <Card className="border-gray-200 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={defaultHostImage} alt={host_name} />
                  <AvatarFallback>{host_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-500">Host</p>
                  <p className="text-lg font-medium text-gray-800">{host_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Skills Offered</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="border-gray-300" />

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-6 h-6 mr-2" />
              <span>Online</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Calendar className="w-6 h-6 flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="w-6 h-6 flex-shrink-0" />
                <span>
                  {convertToLocalTime(start_time)} - {convertToLocalTime(end_time)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-6 h-6 flex-shrink-0" />
                <span>
                  {current_participants_count} / {max_participants} participants
                </span>
              </div>
            </div>
            {link && (
              <Button variant="outline" className="w-full bg-green-600 text-white hover:bg-blue-700 hover:text-yellow-100 p-6 text-xl flex items-center justify-center" asChild>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <Video className="w-10 h-10 mr-2" />
                  Join Meeting
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsPopup;
