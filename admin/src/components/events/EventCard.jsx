import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon } from 'lucide-react'

export default function EventCard({ title, date, status, host, description, location }) {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-700',
    past: 'bg-green-100 text-green-700',
    canceled: 'bg-red-100 text-red-700'
  }

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-white mb-1">{title}</CardTitle>
            <CardDescription className="text-sm text-white/80">
              <span className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {date}
              </span>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center text-gray-100/80 pt-1">
            <UserIcon className="w-4 h-4 mr-1" />
            <span className="font-medium">{host}</span>
          </div>
         </div>
            </CardDescription>
          </div>
          <Badge className={`${statusColors[status]} font-semibold uppercase text-xs px-2 py-1 rounded-full`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
       
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex justify-center">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
          View Details
        </button>
      </CardFooter>
    </Card>
  )
}

