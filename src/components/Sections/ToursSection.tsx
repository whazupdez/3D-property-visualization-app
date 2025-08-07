'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Maximize, Eye, VolumeX, Volume2, Settings, ArrowLeft, ArrowRight } from 'lucide-react';
import { PropertyData } from '@/types/property';

interface ToursSectionProps {
  data: PropertyData['virtualTours'];
}

type TourType = '3d' | '360';
type ViewMode = 'grid' | 'fullscreen';

export default function ToursSection({ data }: ToursSectionProps) {
  const [selectedTourType, setSelectedTourType] = useState<TourType>('3d');
  const [selectedTour, setSelectedTour] = useState<PropertyData['virtualTours']['tours3D'][0] | PropertyData['virtualTours']['tours360'][0] | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentTours = selectedTourType === '3d' ? data.tours3D : data.tours360;

  useEffect(() => {
    if (currentTours.length > 0) {
      setSelectedTour(currentTours[0]);
      setCurrentTourIndex(0);
    }
  }, [selectedTourType, currentTours]);

  const handleTourSelect = (tour: any, index: number) => {
    setSelectedTour(tour);
    setCurrentTourIndex(index);
    if (viewMode === 'grid') {
      setViewMode('fullscreen');
    }
  };

  const nextTour = () => {
    const nextIndex = (currentTourIndex + 1) % currentTours.length;
    setSelectedTour(currentTours[nextIndex]);
    setCurrentTourIndex(nextIndex);
  };

  const prevTour = () => {
    const prevIndex = currentTourIndex === 0 ? currentTours.length - 1 : currentTourIndex - 1;
    setSelectedTour(currentTours[prevIndex]);
    setCurrentTourIndex(prevIndex);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the 3D scene or 360° tour playback
  };

  const resetView = () => {
    // In a real implementation, this would reset the camera position
    console.log('Resetting view...');
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (viewMode === 'fullscreen') {
        setShowControls(false);
      }
    }, 3000);
  };

  const ThreeDViewer = ({ tour }: { tour: PropertyData['virtualTours']['tours3D'][0] }) => {
    return (
      <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative">
        {/* Placeholder for Three.js 3D Model */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Eye size={48} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{tour.title}</h3>
              <p className="text-gray-300 mb-4">{tour.description}</p>
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                <p className="text-sm text-gray-300">3D Model: {tour.modelPath}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading Indicator */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-white">Loading 3D Model...</span>
          </div>
        </div>
      </div>
    );
  };

  const Tour360Viewer = ({ tour }: { tour: PropertyData['virtualTours']['tours360'][0] }) => {
    return (
      <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative">
        {tour.embedUrl ? (
          <iframe
            ref={iframeRef}
            src={tour.embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={tour.title}
            onLoad={() => console.log('360° tour loaded')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900 to-blue-900">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <Eye size={48} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{tour.title}</h3>
                <p className="text-gray-300 mb-4">{tour.description}</p>
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                  <p className="text-sm text-gray-300">AIHouse.com Integration</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Indicator */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white">Loading 360° Tour...</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="w-full h-full bg-gradient-to-br from-indigo-900 to-black text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between p-tv-safe">
          {/* Tour Type Selector */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTourType('3d')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTourType === '3d' ? 'bg-blue-500' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Eye size={20} />
              <span>3D Models ({data.tours3D.length})</span>
            </button>
            <button
              onClick={() => setSelectedTourType('360')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTourType === '360' ? 'bg-green-500' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Eye size={20} />
              <span>360° Tours ({data.tours360.length})</span>
            </button>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'fullscreen' : 'grid')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Maximize size={20} />
              <span>{viewMode === 'grid' ? 'Fullscreen' : 'Grid View'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 h-full">
        <AnimatePresence mode="wait">
          {/* Grid View */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="h-full p-tv-safe"
            >
              <div className="text-center mb-8">
                <h2 className="text-tv-h1 font-bold mb-4">
                  {selectedTourType === '3d' ? '3D Virtual Tours' : '360° Virtual Tours'}
                </h2>
                <p className="text-tv-body text-gray-300">
                  {selectedTourType === '3d' 
                    ? 'Explore detailed 3D models of the property'
                    : 'Experience immersive 360° virtual tours'
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {currentTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleTourSelect(tour, index)}
                  >
                    {/* Tour Preview */}
                    <div className="aspect-video bg-gray-700 relative overflow-hidden">
                      <img 
                        src={tour.thumbnail}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-tour.jpg';
                        }}
                      />
                      
                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play size={24} className="text-white ml-1" />
                        </div>
                      </div>
                      
                      {/* Tour Type Badge */}
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                        selectedTourType === '3d' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {selectedTourType === '3d' ? '3D' : '360°'}
                      </div>
                    </div>
                    
                    {/* Tour Info */}
                    <div className="p-4">
                      <h3 className="text-tv-button font-bold mb-2">{tour.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{tour.description}</p>
                      
                      {/* Tour Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Duration: {tour.duration}</span>
                        <span className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>Interactive</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fullscreen View */}
          {viewMode === 'fullscreen' && selectedTour && (
            <motion.div
              key="fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full relative"
            >
              {/* Tour Viewer */}
              <div className="h-full">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-white">Loading virtual tour...</p>
                    </div>
                  </div>
                }>
                  {selectedTourType === '3d' ? (
                    <ThreeDViewer tour={selectedTour as PropertyData['virtualTours']['tours3D'][0]} />
                  ) : (
                    <Tour360Viewer tour={selectedTour as PropertyData['virtualTours']['tours360'][0]} />
                  )}
                </Suspense>
              </div>

              {/* Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {/* Top Controls */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-lg font-bold text-white">{selectedTour.title}</h3>
                        <p className="text-sm text-gray-300">{selectedTour.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <button
                          onClick={() => setViewMode('grid')}
                          className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
                        >
                          <ArrowLeft size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    {currentTours.length > 1 && (
                      <>
                        <button
                          onClick={prevTour}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-colors pointer-events-auto"
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <button
                          onClick={nextTour}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-colors pointer-events-auto"
                        >
                          <ArrowRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlayback}
                          className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          onClick={resetView}
                          className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors"
                        >
                          <RotateCcw size={20} />
                        </button>
                      </div>
                      
                      {/* Tour Progress */}
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                        <span className="text-sm text-white">
                          {currentTourIndex + 1} / {currentTours.length}
                        </span>
                      </div>
                      
                      <button className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/90 transition-colors">
                        <Settings size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}