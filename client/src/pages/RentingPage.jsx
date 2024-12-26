import React, { useState, useMemo } from "react";
import { Music, Calendar, ChevronDown } from "lucide-react";

// Data
const instruments = [
  {
    id: "1",
    name: "Yamaha Grand Piano",
    ownerName: "Sarah Johnson",
    ownerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    availableDate: "2024-03-20",
    location: "New York",
  },
  {
    id: "2",
    name: "Fender Stratocaster",
    ownerName: "Mike Chen",
    ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    availableDate: "2024-03-22",
    location: "Los Angeles",
  },
  {
    id: "3",
    name: "Selmer Saxophone",
    ownerName: "David Wilson",
    ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    availableDate: "2024-03-25",
    location: "Chicago",
  },
  {
    id: "4",
    name: "Violin Stradivarius",
    ownerName: "Emma Davis",
    ownerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    availableDate: "2024-03-21",
    location: "New York",
  },
  {
    id: "5",
    name: "Roland Drum Kit",
    ownerName: "James Smith",
    ownerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    availableDate: "2024-03-23",
    location: "Los Angeles",
  },
  {
    id: "6",
    name: "Classical Guitar",
    ownerName: "Lisa Brown",
    ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    availableDate: "2024-03-24",
    location: "Chicago",
  },
];

// Components
function LocationDropdown({ locations, selectedLocation, onLocationChange }) {
  return (
    <div className="relative w-full max-w-xs">
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
      />
    </div>
  );
}

function InstrumentCard({ instrument }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={instrument.ownerImage}
            alt={instrument.ownerName}
            className="size-7 rounded-full object-cover"
          />
          <div>
            <h3 className="text-[.9rem] font-semibold text-gray-800">
              {instrument.ownerName}
            </h3>
            <p className="text-xs text-gray-500">{instrument.location}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {instrument.name}
        </h2>

        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Available from {instrument.availableDate}
          </span>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Rent Now
        </button>
      </div>
    </div>
  );
}

export default function RentingPage() {
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = useMemo(
    () => [...new Set(instruments.map((i) => i.location))].sort(),
    [],
  );

  const filteredInstruments = useMemo(
    () =>
      selectedLocation
        ? instruments.filter((i) => i.location === selectedLocation)
        : instruments,
    [selectedLocation],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Renting
          </h1>
          <LocationDropdown
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </div>
      </div>
    </div>
  );
}
