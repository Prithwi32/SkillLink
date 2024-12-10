import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cards } from "@/constants/carousel-content";
import { Button } from "./ui/button";

const Card = ({ title, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl m-4 z-50 relative flex flex-col md:flex-row max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8 px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Top skills</h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {cards.map((card) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={card.id}>
                <Card
                  title={card.title}
                  image={card.image}
                  onClick={() => setSelectedCard(card)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>

      <Modal isOpen={!!selectedCard} onClose={() => setSelectedCard(null)}>
        {selectedCard && (
          <>
            <div className="w-full md:w-1/2">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="p-6 w-full md:w-1/2 flex flex-col justify-between overflow-scroll">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedCard.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedCard.description}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedCard(null)}>Close</Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default App;