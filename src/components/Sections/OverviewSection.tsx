'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, DollarSign, Home, Maximize, Users } from 'lucide-react';
import { PropertyData } from '@/types/property';

interface OverviewSectionProps {
  data: PropertyData['overview'];
}

export default function OverviewSection({ data }: OverviewSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
    setIsVideoPlaying(!showVideo);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black text-white flex">
      {/* Left Panel - Hero Content (60%) */}
      <div className="w-3/5 h-full relative overflow-hidden">
        {/* Hero Media */}
        <div className="absolute inset-0">
          {showVideo && data.heroVideo ? (
            <video
              className="w-full h-full object-cover"
              src={data.heroVideo}
              autoPlay={isVideoPlaying}
              muted
              loop
              onLoadedData={() => setIsVideoPlaying(true)}
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${data.heroImage})` }}
            />
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-tv-safe">
          {/* Property Name & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-tv-h1 font-bold mb-4 leading-tight">
              {data.name}
            </h1>
            <p className="text-tv-body text-gray-200 mb-6">
              {data.tagline}
            </p>
          </motion.div>

          {/* Video Toggle Button */}
          {data.heroVideo && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              onClick={toggleVideo}
              className="
                flex items-center space-x-3 bg-white/20 backdrop-blur-sm
                px-6 py-4 rounded-xl hover:bg-white/30 transition-all duration-300
                min-w-tv-button border border-white/30
              "
            >
              {showVideo ? (
                <>
                  <Pause size={24} />
                  <span className="text-tv-button">Pause Video</span>
                </>
              ) : (
                <>
                  <Play size={24} />
                  <span className="text-tv-button">Play Video Tour</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Right Panel - Property Details (40%) */}
      <div className="w-2/5 h-full bg-black/50 backdrop-blur-sm border-l border-white/20">
        <div className="h-full overflow-y-auto p-tv-safe">
          {/* Price & Key Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign size={32} className="text-accent-500" />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">Starting From</p>
                <p className="text-tv-h2 font-bold text-accent-500">
                  {formatPrice(data.price, data.currency)}
                </p>
              </div>
            </div>

            {/* Key Specifications */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <Home size={24} className="mx-auto mb-2 text-blue-400" />
                <p className="text-tv-button font-semibold">{data.keySpecs.bedrooms}</p>
                <p className="text-sm text-gray-400">Bedrooms</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <Users size={24} className="mx-auto mb-2 text-green-400" />
                <p className="text-tv-button font-semibold">{data.keySpecs.bathrooms}</p>
                <p className="text-sm text-gray-400">Bathrooms</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <Maximize size={24} className="mx-auto mb-2 text-purple-400" />
                <p className="text-tv-button font-semibold">{data.keySpecs.sqft.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Sq Ft</p>
              </div>
            </div>
          </motion.div>

          {/* Property Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-tv-h2 font-semibold mb-4">About This Property</h3>
            <p className="text-tv-body text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-tv-h2 font-semibold mb-4">Key Features</h3>
            <div className="space-y-3">
              {data.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0" />
                  <p className="text-tv-body text-gray-200">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 pt-6 border-t border-white/20"
          >
            <p className="text-center text-gray-400 mb-4">
              Explore more sections to discover everything this property offers
            </p>
            <div className="flex justify-center space-x-2">
              {['Location', 'Units', 'Tours', 'Contact'].map((section, index) => (
                <div key={section} className="w-3 h-3 bg-white/30 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}