"use client"

import * as React from "react"
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ReportDialog() {
  const [reason, setReason] = React.useState("")
  const maxLength = 250
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the report submission
    console.log("Report submitted:", reason)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <Card className="w-full max-w-[95%] sm:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg">
        <CardHeader className="bg-[#4461F2] text-white rounded-t-lg p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">Report User</CardTitle>
          <CardDescription className="text-gray-100 text-sm sm:text-base lg:text-lg">
            Please provide details about your report
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm sm:text-base lg:text-lg">Reason for reporting</Label>
              <Textarea
                id="reason"
                placeholder="Please explain why you are reporting this user..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={maxLength}
                className="min-h-[100px] sm:min-h-[120px] lg:min-h-[150px] resize-none text-sm sm:text-base lg:text-lg"
                required
              />
              <div className="flex justify-between text-xs sm:text-sm lg:text-base text-muted-foreground">
                <div className="flex items-center">
                  {reason.length >= maxLength && (
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 text-destructive" />
                  )}
                  <span className={reason.length >= maxLength ? "text-destructive" : ""}>
                    {reason.length} / {maxLength} characters
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 p-4 sm:p-6">
            <Button 
              variant="outline" 
              type="button"
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
  )
}

