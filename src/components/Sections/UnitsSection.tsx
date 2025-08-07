'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Home, Users, Maximize, ArrowLeft, ArrowRight, ZoomIn, Grid, Image as ImageIcon } from 'lucide-react';
import { PropertyData } from '@/types/property';

interface UnitsSectionProps {
  data: PropertyData['units'];
}

type Step = 'selection' | 'floorplan' | 'gallery';

export default function UnitsSection({ data }: UnitsSectionProps) {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [selectedUnit, setSelectedUnit] = useState<PropertyData['units'][0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400 bg-green-400/20';
      case 'reserved': return 'text-yellow-400 bg-yellow-400/20';
      case 'sold': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleUnitSelect = (unit: PropertyData['units'][0]) => {
    setSelectedUnit(unit);
    setCurrentStep('floorplan');
    setSelectedImageIndex(0);
  };

  const goToGallery = () => {
    setCurrentStep('gallery');
  };

  const goBack = () => {
    if (currentStep === 'gallery') {
      setCurrentStep('floorplan');
    } else if (currentStep === 'floorplan') {
      setCurrentStep('selection');
      setSelectedUnit(null);
    }
  };

  const nextImage = () => {
    if (selectedUnit) {
      setSelectedImageIndex((prev) => 
        prev === selectedUnit.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedUnit) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedUnit.gallery.length - 1 : prev - 1
      );
    }
  };

  const galleryCategories = ['all', 'living', 'bedroom', 'kitchen', 'bathroom'];

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-black text-white">
      {/* Header with Step Indicator */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between p-tv-safe">
          {/* Back Button */}
          {currentStep !== 'selection' && (
            <button
              onClick={goBack}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          
          {/* Step Indicator */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'selection' ? 'bg-purple-500' : 'bg-white/20'
            }`}>
              <Building size={20} />
              <span>1. Select Unit Type</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'floorplan' ? 'bg-purple-500' : 'bg-white/20'
            }`}>
              <Grid size={20} />
              <span>2. Floor Plan</span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentStep === 'gallery' ? 'bg-purple-500' : 'bg-white/20'
            }`}>
              <ImageIcon size={20} />
              <span>3. Gallery</span>
            </div>
          </div>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 h-full">
        <AnimatePresence mode="wait">
          {/* Step 1: Unit Type Selection */}
          {currentStep === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full p-tv-safe"
            >
              <div className="text-center mb-8">
                <h2 className="text-tv-h1 font-bold mb-4">Choose Your Perfect Unit</h2>
                <p className="text-tv-body text-gray-300">Select a unit type to explore floor plans and gallery</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {data.map((unit, index) => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleUnitSelect(unit)}
                  >
                    {/* Unit Image Preview */}
                    <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={unit.gallery[0]} 
                        alt={unit.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-unit.jpg';
                        }}
                      />
                    </div>
                    
                    {/* Unit Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-tv-h2 font-bold">{unit.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                          getAvailabilityColor(unit.availability)
                        }`}>
                          {unit.availability}
                        </span>
                      </div>
                      
                      <p className="text-tv-h2 font-bold text-purple-400">
                        {formatPrice(unit.price)}
                      </p>
                      
                      {/* Specs */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/10 rounded-lg p-2">
                          <Home size={20} className="mx-auto mb-1 text-blue-400" />
                          <p className="text-sm font-semibold">{unit.specs.bedrooms}</p>
                          <p className="text-xs text-gray-400">Beds</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2">
                          <Users size={20} className="mx-auto mb-1 text-green-400" />
                          <p className="text-sm font-semibold">{unit.specs.bathrooms}</p>
                          <p className="text-xs text-gray-400">Baths</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2">
                          <Maximize size={20} className="mx-auto mb-1 text-purple-400" />
                          <p className="text-sm font-semibold">{unit.specs.sqft.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">Sq Ft</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Floor Plan Details */}
          {currentStep === 'floorplan' && selectedUnit && (
            <motion.div
              key="floorplan"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="h-full flex"
            >
              {/* Floor Plan (60%) */}
              <div className="w-3/5 h-full p-tv-safe">
                <div className="h-full bg-white/10 rounded-xl p-6 flex flex-col">
                  <h3 className="text-tv-h2 font-bold mb-4 flex items-center">
                    <Grid className="mr-3 text-purple-400" size={24} />
                    {selectedUnit.name} Floor Plan
                  </h3>
                  
                  <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden relative group">
                    <img 
                      src={selectedUnit.floorPlan}
                      alt={`${selectedUnit.name} floor plan`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-floorplan.jpg';
                      }}
                    />
                    
                    {/* Zoom Indicator */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={16} />
                      <span className="text-sm">Hover to zoom</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={goToGallery}
                    className="mt-4 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ImageIcon size={20} />
                    <span>View Unit Gallery</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              
              {/* Unit Specifications (40%) */}
              <div className="w-2/5 h-full bg-black/50 backdrop-blur-sm border-l border-white/20 p-tv-safe">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-tv-h2 font-bold mb-4">{selectedUnit.name}</h3>
                    <p className="text-tv-h2 font-bold text-purple-400 mb-4">
                      {formatPrice(selectedUnit.price)}
                    </p>
                  </div>
                  
                  {/* Detailed Specs */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-tv-button font-semibold mb-3">Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Bedrooms:</span>
                        <span className="font-semibold">{selectedUnit.specs.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Bathrooms:</span>
                        <span className="font-semibold">{selectedUnit.specs.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Square Feet:</span>
                        <span className="font-semibold">{selectedUnit.specs.sqft.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Availability:</span>
                        <span className={`font-semibold capitalize ${
                          selectedUnit.availability === 'available' ? 'text-green-400' :
                          selectedUnit.availability === 'reserved' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {selectedUnit.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <h4 className="text-tv-button font-semibold mb-3">Features</h4>
                    <div className="space-y-2">
                      {selectedUnit.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                          <span className="text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Unit Gallery */}
          {currentStep === 'gallery' && selectedUnit && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="h-full flex"
            >
              {/* Main Image (70%) */}
              <div className="w-7/10 h-full p-tv-safe">
                <div className="h-full bg-white/10 rounded-xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-tv-h2 font-bold flex items-center">
                      <ImageIcon className="mr-3 text-purple-400" size={24} />
                      {selectedUnit.name} Gallery
                    </h3>
                    
                    {/* Image Counter */}
                    <div className="bg-black/50 px-3 py-1 rounded-lg">
                      <span className="text-sm">
                        {selectedImageIndex + 1} / {selectedUnit.gallery.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Main Image Display */}
                  <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden relative">
                    <img 
                      src={selectedUnit.gallery[selectedImageIndex]}
                      alt={`${selectedUnit.name} image ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-gallery.jpg';
                      }}
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                    >
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Strip (30%) */}
              <div className="w-3/10 h-full bg-black/50 backdrop-blur-sm border-l border-white/20 p-tv-safe">
                <div className="space-y-4">
                  {/* Category Filters */}
                  <div>
                    <h4 className="text-tv-button font-semibold mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {galleryCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setGalleryFilter(category)}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold capitalize transition-colors ${
                            galleryFilter === category
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/20 text-gray-300 hover:bg-white/30'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div>
                    <h4 className="text-tv-button font-semibold mb-3">Images</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {selectedUnit.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-square bg-gray-700 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? 'border-purple-400 scale-105'
                              : 'border-transparent hover:border-white/50'
                          }`}
                        >
                          <img 
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder-thumb.jpg';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}