import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReportDialog({ onClose }) {
  const [reason, setReason] = React.useState("");
  const maxLength = 250;

  const { backendUrl } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/report-user/new`,
        { reason, reportedUser: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success("Report submitted successfully");
        onClose(); // Close the popup after submission
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to submit report:", error);
      toast.error("Failed to submit report. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-[95%] sm:max-w-md lg:max-w-lg shadow-lg relative rounded-lg bg-white">
        {/* Modal Header */}
        <CardHeader className="bg-[#4461F2] text-white rounded-t-lg p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Report User
              </CardTitle>
              <CardDescription className="text-gray-100 text-sm sm:text-base lg:text-lg">
                Please provide details about your report
              </CardDescription>
            </div>
            {/* <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-gray-300 text-lg sm:text-xl"
            >
              ✖
            </button> */}
          </div>
        </CardHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="space-y-2">
              <Label
                htmlFor="reason"
                className="text-sm sm:text-base lg:text-lg"
              >
                Reason for reporting
              </Label>
              <Textarea
                id="reason"
                placeholder="Please explain why you are reporting this user..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={maxLength}
                className="min-h-[100px] sm:min-h-[120px] lg:min-h-[150px] resize-none text-sm sm:text-base lg:text-lg border-gray-300 focus:ring-2 focus:ring-[#4461F2] focus:border-[#4461F2]"
                required
              />
              <div className="flex justify-between text-xs sm:text-sm lg:text-base text-muted-foreground">
                <div className="flex items-center">
                  {reason.length >= maxLength && (
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 text-destructive" />
                  )}
                  <span
                    className={
                      reason.length >= maxLength ? "text-destructive" : ""
                    }
                  >
                    {reason.length} / {maxLength} characters
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 p-4 sm:p-6">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base lg:text-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#4461F2] hover:bg-[#3651D2] text-white text-sm sm:text-base lg:text-lg"
              disabled={reason.length === 0}
            >
              Submit Report
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
