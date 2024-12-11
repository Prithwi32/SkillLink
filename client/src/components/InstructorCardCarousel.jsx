import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { InstructorCard } from "./InstructorCard"

export function InstructorCardCarousel({ instructors }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {instructors.map((instructor, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
            <div className="p-1 h-full">
              <InstructorCard {...instructor} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

