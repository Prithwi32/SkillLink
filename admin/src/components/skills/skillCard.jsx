import React from 'react';
import { Card, CardHeader, CardTitle,  CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { CalendarIcon, UserIcon } from 'lucide-react'

export default function SkillsCard({ title, description, status }) {
  const statusColors = {
    approved: 'bg-blue-100 text-blue-700',
    inReview: 'bg-green-100 text-green-700',
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-white mb-1 pr-10">
                {title}
            </CardTitle>
          </div>
          <Badge className={`${statusColors[status]} font-semibold uppercase text-xs px-2 py-1 rounded-full`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
        </p>       
      </CardContent>
      <CardFooter className="p-4 bg-gray-200 flex justify-center">
               {status === "inReview" && (
                            <div className="flex justify-between mt-4">
                              <button
                                size="sm"
                                variant="outline"
                                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-green-700 transition-colors duration-200 mr-5"
                                onClick={() => {
                                  // Handle approval logic
                                  console.log(`Approved skill: ${title}`)
                                }}
                              >
                                Approve
                              </button>
                              <button
                                size="sm"
                                variant="destructive"
                               className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-red-700 transition-colors duration-200 ml-5"
                                onClick={() => {
                                  // Handle block logic
                                  console.log(`Decline skill: ${title}`)
                                }}
                              >
                                Decline
                              </button>
                            </div>
                          )}

            {status === "approved" && (
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
                            View Details
                            </button>
                          )}
       
      </CardFooter>
    </Card>
  )
}

