import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { InstrumentCard } from '../components/Cards/InstrumentCard';
import { RentForm } from '../components/Forms/RentForm';

const initialInstruments = [
  {
    id: 1,
    name: 'Vintage Violin',
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
    userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    userName: 'Suraj Sharma',
    location: 'Karnataka',
    startDate: '2024-03-20',
    isRented: false
  },
  {
    id: 2,
    name: 'Classical Guitar',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    userName: 'Krishna Raj',
    location: 'Kerala',
    startDate: '2024-03-22',
    isRented: false
  }
];

function RentingPage() {
  const [instruments, setInstruments] = useState(initialInstruments);
  const [showRentForm, setShowRentForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = Array.from(new Set(instruments.map(i => i.location)));

  const handleRentInstrument = (id) => {
    setInstruments(prev =>
      prev.map(instrument =>
        instrument.id === id ? { ...instrument, isRented: true } : instrument
      )
    );
  };

  const handleAddInstrument = (data) => {
    const newInstrument = {
      id: Date.now(),
      name: data.instrumentName,
      image: data.image,
      userImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
      userName: data.name,
      location: data.location,
      startDate: data.startDate,
      isRented: false
    };
    setInstruments(prev => [...prev, newInstrument]);
  };

  const filteredInstruments = selectedLocation
    ? instruments.filter(i => i.location === selectedLocation)
    : instruments;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Music className="text-blue-500 mr-2" size={32} />
          <h1 className="text-4xl font-bold text-gray-800">Start Renting</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowRentForm(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Rent My Instrument
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map(instrument => (
            <InstrumentCard
              key={instrument.id}
              {...instrument}
              onRent={() => handleRentInstrument(instrument.id)}
            />
          ))}
        </div>

        {showRentForm && (
          <RentForm
            onClose={() => setShowRentForm(false)}
            onSubmit={handleAddInstrument}
          />
        )}
      </div>
    </div>
  );
}

export default RentingPage;
