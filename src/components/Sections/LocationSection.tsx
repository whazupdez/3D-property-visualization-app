'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Star, Car, Train, Bus, Zap } from 'lucide-react';
import type { PropertyData } from '@/types/property';

interface LocationSectionProps {
  data: PropertyData['location'];
}

// Simple map component (fallback when Mapbox is not available)
function SimpleMap({ coordinates, address }: { coordinates: [number, number]; address: string }) {
  return (
    <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Center Marker */}
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <MapPin size={32} className="text-white" />
        </div>
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-semibold">Property Location</p>
          <p className="text-gray-300 text-xs">{coordinates[1].toFixed(4)}, {coordinates[0].toFixed(4)}</p>
        </div>
      </div>
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          +
        </button>
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          −
        </button>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  const icons = {
    'Recreation': '🌳',
    'Culture': '🏛️',
    'Shopping': '🛒',
    'Healthcare': '🏥',
    'Fitness': '💪',
    'Education': '🎓',
    'Dining': '🍽️',
    'Transportation': '🚇'
  };
  return icons[category as keyof typeof icons] || '📍';
}

function getTransportIcon(type: string) {
  const icons = {
    'bus': '🚌',
    'train': '🚂',
    'subway': '🚇',
    'airport': '✈️'
  };
  return icons[type as keyof typeof icons] || '🚌';
}

export default function LocationSection({ data }: LocationSectionProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-900 to-black text-white flex">
      {/* Left Side - Interactive Map (50%) */}
      <div className="w-1/2 h-full p-tv-safe">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          {/* Map Header */}
          <div className="mb-4">
            <h2 className="text-tv-h2 font-bold mb-2 flex items-center">
              <MapPin className="mr-3 text-green-400" size={32} />
              Prime Location
            </h2>
            <p className="text-tv-body text-gray-300">
              Explore the neighborhood and nearby amenities
            </p>
          </div>

          {/* Map Container */}
          <div className="w-full flex-1 relative">
            {mapLoaded ? (
              <SimpleMap coordinates={data.coordinates} address={data.address} />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading interactive map...</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Location Details (50%) */}
      <div className="w-1/2 h-full bg-black/50 backdrop-blur-sm border-l border-white/20">
        <div className="h-full overflow-y-auto p-tv-safe">
          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-tv-h2 font-semibold mb-4 flex items-center">
              <Navigation className="mr-3 text-blue-400" size={24} />
              Address
            </h3>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-tv-body text-gray-200">{data.address}</p>
            </div>
          </motion.div>

          {/* Nearby Amenities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-tv-h2 font-semibold mb-4 flex items-center">
              <Zap className="mr-3 text-yellow-400" size={24} />
              Nearby Amenities
            </h3>
            <div className="space-y-3">
              {data.nearbyAmenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      selectedAmenity === index
                        ? 'bg-green-500/20 border border-green-400'
                        : 'bg-white/10 hover:bg-white/20'
                    }
                  `}
                  onClick={() => setSelectedAmenity(selectedAmenity === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(amenity.category)}</span>
                      <div>
                        <p className="text-tv-body font-semibold text-white">{amenity.name}</p>
                        <p className="text-sm text-gray-400">{amenity.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-tv-button font-semibold text-green-400">{amenity.distance}</p>
                      <p className="text-xs text-gray-400">walking</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Transportation Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-tv-h2 font-semibold mb-4 flex items-center">
              <Navigation className="mr-3 text-purple-400" size={24} />
              Transportation
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {data.transportationLinks.map((transport, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getTransportIcon(transport.type)}</span>
                    <p className="text-tv-body text-white">{transport.name}</p>
                  </div>
                  <p className="text-tv-button font-semibold text-purple-400">{transport.distance}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Neighborhood Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-tv-h2 font-semibold mb-4 flex items-center">
              <Clock className="mr-3 text-orange-400" size={24} />
              Neighborhood Highlights
            </h3>
            <div className="space-y-3">
              {data.neighborhoodHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                  <p className="text-tv-body text-gray-200">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}