'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, Building, Camera, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationSection } from '@/types/property';

interface TVLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'overview',
    name: 'Overview',
    icon: 'Home',
    color: 'bg-blue-500',
    description: 'Landing + Property Info'
  },
  {
    id: 'location',
    name: 'Location',
    icon: 'MapPin',
    color: 'bg-green-500',
    description: 'Map + Amenities'
  },
  {
    id: 'units',
    name: 'Units',
    icon: 'Building',
    color: 'bg-purple-500',
    description: 'Types + Floor Plans'
  },
  {
    id: 'tours',
    name: 'Tours',
    icon: 'Camera',
    color: 'bg-red-500',
    description: '3D + 360° VR'
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: 'Phone',
    color: 'bg-yellow-500',
    description: 'Form + Agent Info'
  }
];

const IconComponent = ({ iconName }: { iconName: string }) => {
  const icons = {
    Home,
    MapPin,
    Building,
    Camera,
    Phone
  };
  
  const Icon = icons[iconName as keyof typeof icons] || Home;
  return <Icon size={32} />;
};

export default function TVLayout({ children, currentSection, onSectionChange }: TVLayoutProps) {
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // TV Remote navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setFocusedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setFocusedIndex(prev => Math.min(navigationSections.length - 1, prev + 1));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onSectionChange(navigationSections[focusedIndex].id);
          break;
        case 'Escape':
          setIsNavigationVisible(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, onSectionChange]);

  // Auto-hide navigation after inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavigationVisible(false);
    }, 5000);

    const showNavigation = () => {
      setIsNavigationVisible(true);
      clearTimeout(timer);
    };

    window.addEventListener('mousemove', showNavigation);
    window.addEventListener('keydown', showNavigation);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', showNavigation);
      window.removeEventListener('keydown', showNavigation);
    };
  }, []);

  return (
    <div className="tv-container w-screen h-screen aspect-tv overflow-hidden bg-black relative">
      {/* Main Content Area */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <AnimatePresence>
        {isNavigationVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t-2 border-white/20"
          >
            <div className="flex justify-center items-center py-6 px-tv-safe">
              <div className="flex space-x-4">
                {navigationSections.map((section, index) => {
                  const isActive = section.id === currentSection;
                  const isFocused = index === focusedIndex;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => onSectionChange(section.id)}
                      className={`
                        relative flex flex-col items-center justify-center
                        min-w-tv-button min-h-tv-button p-4 rounded-xl
                        transition-all duration-300 transform
                        ${
                          isActive
                            ? `${section.color} text-white scale-110 shadow-2xl`
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }
                        ${
                          isFocused
                            ? 'ring-4 ring-accent-500 ring-opacity-75'
                            : ''
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Section Number */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-2
                        text-xl font-bold
                        ${
                          isActive
                            ? 'bg-white/20'
                            : 'bg-white/10'
                        }
                      `}>
                        {index + 1}
                      </div>
                      
                      {/* Section Icon */}
                      <div className="mb-2">
                        <IconComponent iconName={section.icon} />
                      </div>
                      
                      {/* Section Name */}
                      <h3 className="text-tv-button font-semibold mb-1">
                        {section.name}
                      </h3>
                      
                      {/* Section Description */}
                      <p className="text-sm text-center opacity-80">
                        {section.description}
                      </p>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                className="h-full bg-accent-500"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${((navigationSections.findIndex(s => s.id === currentSection) + 1) / navigationSections.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TV Remote Instructions Overlay */}
      <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-lg text-sm opacity-60">
        <div className="space-y-1">
          <div>← → Navigate sections</div>
          <div>Enter: Select</div>
          <div>Esc: Toggle navigation</div>
        </div>
      </div>

      {/* Section Title Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg"
        >
          <h1 className="text-tv-h2 font-bold">
            {navigationSections.find(s => s.id === currentSection)?.name || 'PropertyVista TV'}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}