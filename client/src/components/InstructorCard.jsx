import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { StarRating } from './StarRating';

export function InstructorCard({ photo, name, skill, description, date, rating }) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
          <h3 className="text-lg font-semibold">{name}</h3>
          <StarRating rating={rating}/>

          </div>
        </div>
        <h4 className="text-md font-medium mb-2">{skill}</h4>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{description}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="outline" className="w-full">View More</Button>
      </CardFooter>
    </Card>
  )
}

