import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Search, MapPin, DollarSign } from 'lucide-react';
import { getAllFlights } from '../services/flightService';

export default function FlightsList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getAllFlights();
        setFlights(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flights');
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const filteredFlights = flights.filter(flight => 
    flight.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.flightName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Plane className="w-12 h-12 text-blue-600" />
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-600">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search flights by name, source, or destination..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Flights Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No flights found</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredFlights.map((flight) => (
              <motion.div
                key={flight.flightId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{flight.flightName}</h2>
                  <Plane className="w-6 h-6 text-blue-600 transform -rotate-45" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      <span>From:</span>
                    </div>
                    <span className="font-medium">{flight.source}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      <span>To:</span>
                    </div>
                    <span className="font-medium">{flight.destination}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Price:</span>
                    </div>
                    <span className="font-medium text-blue-600">${flight.ticketPrice}</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Book Now</span>
                  <Plane className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
} 