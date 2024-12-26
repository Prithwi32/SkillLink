"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "../Cards/EventCard";

const EventCarousel = ({ topEvents }) => {
  const [api, setApi] = useState();
  const [isDesktop, setIsDesktop] = useState(false);

  // console.log(topEvents);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 640px)").matches);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      api.scrollTo(api.selectedScrollSnap(), {
        duration: 400,
      });
    });
  }, [api]);

  const handleNextClick = () => {
    if (api) {
      const nextIndex = (api.selectedScrollSnap() + 1) % topEvents.length;
      api.scrollTo(nextIndex);
    }
  };

  const handlePrevClick = () => {
    if (api) {
      const prevIndex =
        (api.selectedScrollSnap() - 1 + topEvents.length) % topEvents.length;
      api.scrollTo(prevIndex);
    }
  };

  return (
    <Carousel
      setApi={setApi}
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {topEvents.map((event, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 w-full sm:basis-1/2"
          >
            <div className="p-1 h-full">
              <EventCard {...event} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div>
        <CarouselPrevious onClick={handlePrevClick} />
        <CarouselNext onClick={handleNextClick} />
      </div>
    </Carousel>
  );
};

export default EventCarousel;
