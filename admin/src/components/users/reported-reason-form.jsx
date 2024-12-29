"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminContext } from "@/context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

export default function ReportedUserReason({
  user,
  onClose,
  isFromReportedUser,
}) {
  const { backendUrl } = useContext(AdminContext);
  const [reasons, setReasons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReasons = async () => {
    setIsLoading(true);
    const route = !isFromReportedUser
      ? `/api/report-user/reasons/${user._id}`
      : `/api/report-user/reasons/${user.userId}`;

    try {
      const { data } = await axios.get(backendUrl + route);
      if (data.success) {
        setReasons(data.reasons);
      } else {
        toast.error("Failed to fetch reasons");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch reasons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReasons();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <form className="space-y-4">
          {isLoading && (
            <p className="font-semibold text-slate-400">Loading...</p>
          )}
          {!isLoading &&
            reasons.length > 0 &&
            reasons.map((reason) => (
              <div key={reason._id} className="bg-gray-100 p-2 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <img
                      className="size-10 rounded-full object-cover"
                      src={
                        reason.reportedBy.photo ||
                        "https://e7.pngegg.com/pngimages/1008/377/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-black-hair-thumbnail.png"
                      }
                      alt=""
                    />
                    <p className="font-bold">{reason.reportedBy.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {reason.dateReported.slice(0, 10)}
                  </p>
                </div>
                <p className="pl-2 pt-2">{reason.reason}</p>
              </div>
            ))}
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
