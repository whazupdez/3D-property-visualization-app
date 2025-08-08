'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { samplePropertyData } from '@/data/sampleProperty';
import { Home, MapPin, Building, Camera, Phone } from 'lucide-react';

// 3D Model Components
function BeaksModelLowPoly() {
  const { scene } = useGLTF('/beaks.glb');
  return <primitive object={scene} />;
}

function BeaksModelHighPoly() {
  const { scene } = useGLTF('/beaks-hi.glb');
  return <primitive object={scene} />;
}

function FullViewBeaksModel() {
  const { scene } = useGLTF('/beaks-hi.glb');
  return <primitive object={scene} />;
}



const navigationSections = [
  { id: 'overview', name: 'Overview', icon: Home, color: 'blue' },
  { id: 'location', name: 'Location', icon: MapPin, color: 'green' },
  { id: 'units', name: 'Types', icon: Building, color: 'purple' },
  { id: 'tours', name: 'Virtual Tours', icon: Camera, color: 'orange' },
  { id: 'contact', name: 'Contact', icon: Phone, color: 'red' }
];

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalSize, setModalSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState(false);
  const orbitControlsRef = useRef<any>();


  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTourModal = (tour: any) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const closeTourModal = () => {
    setSelectedTour(null);
    setIsModalOpen(false);
  };

  const open3DModal = () => {
    setIs3DModalOpen(true);
  };

  const close3DModal = () => {
    setIs3DModalOpen(false);
  };

  const openFloorPlanModal = () => {
    setIsFloorPlanModalOpen(true);
    // Center the modal
    setModalPosition({ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 });
  };

  const closeFloorPlanModal = () => {
    setIsFloorPlanModalOpen(false);
  };

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - modalPosition.x, y: e.clientY - modalPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setModalPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
    if (isResizing) {
      const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
      setModalSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: modalSize.width,
      height: modalSize.height
    });
  };

  const openFullView = () => {
    setIsFullViewOpen(true);
  };

  const closeFullView = () => {
    setIsFullViewOpen(false);
  };

  const resetCamera = () => {
    console.log('Reset camera button clicked!');
    if (orbitControlsRef.current) {
      console.log('OrbitControls ref found, calling reset');
      orbitControlsRef.current.reset();
    } else {
      console.log('OrbitControls ref not found');
    }
  };

  const toggleAutoOrbit = () => {
    setIsAutoOrbit(!isAutoOrbit);
  };

  function AutoOrbitController() {
    useFrame((state) => {
      if (isAutoOrbit && orbitControlsRef.current) {
        orbitControlsRef.current.autoRotate = true;
        orbitControlsRef.current.autoRotateSpeed = 2.0;
      } else if (orbitControlsRef.current) {
        orbitControlsRef.current.autoRotate = false;
      }
    });
    return null;
  }



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    const sections = ['overview', 'location', 'units', 'tours', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Title Header */}
      <h1 className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 text-2xl mobile-landscape:text-lg font-bold text-white text-center">{samplePropertyData.overview.name}</h1>
      
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 mobile-landscape:px-2 py-4 mobile-landscape:py-2">
          <div className="flex items-center justify-center mobile-landscape:flex-col mobile-landscape:space-y-2">
            <div className="flex space-x-4 mobile-landscape:space-x-2 mobile-landscape:flex-wrap mobile-landscape:justify-center">
              {navigationSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center space-x-2 px-6 py-3 mobile-landscape:px-3 mobile-landscape:py-1 rounded-lg transition-all duration-200 mobile-landscape:text-xs ${
                      currentSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mobile-landscape:w-4 mobile-landscape:h-4" />
                    <span className="font-medium mobile-landscape:hidden lg:inline">{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 mobile-landscape:pb-24 space-y-0">
        {/* Overview Section */}
        <section id="overview" className="min-h-screen flex items-center justify-center p-8 mobile-landscape:p-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 mobile-landscape:grid-cols-1 gap-12 mobile-landscape:gap-6 items-center">
            <div className="mobile-landscape:order-2">
              <img 
                src={samplePropertyData.overview.heroImage} 
                alt={samplePropertyData.overview.name}
                className="w-full h-96 mobile-landscape:h-48 object-cover rounded-2xl mobile-landscape:rounded-lg shadow-2xl"
              />
            </div>
            <div className="mobile-landscape:order-1">
              <h1 className="text-4xl mobile-landscape:text-2xl font-bold mb-2">{samplePropertyData.overview.name}</h1>
              <p className="text-xl mobile-landscape:text-base text-gray-300 mb-4">{samplePropertyData.overview.tagline}</p>
              <p className="text-gray-300 mobile-landscape:text-sm mb-6 mobile-landscape:mb-4">{samplePropertyData.overview.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 mobile-landscape:mb-4">
                <div className="text-center">
                  <div className="text-2xl mobile-landscape:text-lg font-bold">{samplePropertyData.overview.keySpecs.bedrooms}</div>
                  <div className="text-gray-400 mobile-landscape:text-xs">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mobile-landscape:text-lg font-bold">{samplePropertyData.overview.keySpecs.bathrooms}</div>
                  <div className="text-gray-400 mobile-landscape:text-xs">Bathrooms</div>
                </div>
              </div>
              
              <div className="text-3xl mobile-landscape:text-xl font-bold text-blue-400 mb-4">
                ${samplePropertyData.overview.price.toLocaleString()}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="min-h-screen flex items-center justify-center p-8 mobile-landscape:p-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mobile-landscape:text-xl font-bold mb-6 mobile-landscape:mb-4 text-center">Prime Location</h2>
            <div className="grid grid-cols-2 mobile-landscape:grid-cols-1 gap-8 mobile-landscape:gap-4">
              <div>
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">Address</h3>
                <p className="text-gray-300 mobile-landscape:text-sm mb-6 mobile-landscape:mb-4">{samplePropertyData.location.address}</p>
                
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">Nearby Amenities</h3>
                <div className="space-y-3 mobile-landscape:space-y-2">
                  {samplePropertyData.location.nearbyAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 mobile-landscape:space-x-2">
                      <span className="text-2xl mobile-landscape:text-lg">{amenity.icon}</span>
                      <div>
                        <div className="font-medium mobile-landscape:text-sm">{amenity.name}</div>
                        <div className="text-sm mobile-landscape:text-xs text-gray-400">{amenity.distance} • {amenity.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-black/50 rounded-lg h-96 mobile-landscape:h-48 overflow-hidden relative group">
                  <img 
                    src="/mardini-01.png" 
                    alt="Location 3D Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={openFullView}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-semibold text-lg mobile-landscape:text-sm hover:bg-black/60"
                  >
                    Open Fullscreen 3D View
                  </button>
                </div>
                <button
                  onClick={openFullView}
                  className="w-full mt-4 mobile-landscape:mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mobile-landscape:py-1 px-4 mobile-landscape:px-2 mobile-landscape:text-sm rounded transition-colors duration-200"
                >
                  Full View
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Units Section */}
        <section id="units" className="min-h-screen flex items-center justify-center p-8 mobile-landscape:p-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mobile-landscape:text-xl font-bold mb-6 mobile-landscape:mb-4 text-center">Available Types</h2>
            <div className="grid grid-cols-3 mobile-landscape:grid-cols-2 gap-6 mobile-landscape:gap-4">
              {samplePropertyData.units.map((unit: any, index: number) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                  <img 
                    src={unit.gallery[0]} 
                    alt={unit.name} 
                    className="w-full h-48 mobile-landscape:h-32 object-cover rounded-lg mb-4 mobile-landscape:mb-2"
                  />
                  <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-2 mobile-landscape:mb-1">{unit.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mobile-landscape:gap-1 text-sm mobile-landscape:text-xs mb-4 mobile-landscape:mb-2">
                    <div className="text-center">
                      <div className="font-bold">{unit.specs.bedrooms}</div>
                      <div className="text-gray-400">Beds</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{unit.specs.bathrooms}</div>
                      <div className="text-gray-400">Baths</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{unit.specs.sqft}</div>
                      <div className="text-gray-400">Sq Ft</div>
                    </div>
                  </div>
                  <div className="text-lg mobile-landscape:text-base font-bold text-blue-400 mb-4 mobile-landscape:mb-2">
                    ${unit.price.toLocaleString()}
                  </div>
                  <button
                    onClick={openFloorPlanModal}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 mobile-landscape:py-1 px-4 mobile-landscape:px-2 mobile-landscape:text-sm rounded-lg transition-colors"
                  >
                    View Floor Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Tours Section */}
        <section id="tours" className="min-h-screen flex items-center justify-center p-8 mobile-landscape:p-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mobile-landscape:text-xl font-bold mb-6 mobile-landscape:mb-4 text-center">Virtual Tours</h2>
            <div className="grid grid-cols-3 mobile-landscape:grid-cols-1 gap-6 mobile-landscape:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">3D Exterior Tour</h3>
                <div className="bg-black/50 rounded-lg h-64 mobile-landscape:h-40 mb-4 mobile-landscape:mb-2 overflow-hidden relative group">
                  <img 
                    src="/mardini-01.png" 
                    alt="3D Exterior Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={openFullView}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-semibold text-lg mobile-landscape:text-sm hover:bg-black/60"
                  >
                    Open Fullscreen 3D View
                  </button>
                </div>
                <p className="text-gray-300 mobile-landscape:text-sm">{samplePropertyData.virtualTours.tours3D[0]?.title || 'Building Exterior (High Poly 1.3M)'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">360° Interior (Modern)</h3>
                <div className="bg-black/50 rounded-lg h-64 mobile-landscape:h-40 overflow-hidden mb-4 mobile-landscape:mb-2 relative group">
                  {samplePropertyData.virtualTours.tours360[0]?.embedUrl ? (
                    <>
                      <iframe
                        src={samplePropertyData.virtualTours.tours360[0].embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        title={samplePropertyData.virtualTours.tours360[0].title}
                      />
                      <button
                        onClick={() => openTourModal(samplePropertyData.virtualTours.tours360[0])}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-semibold text-lg mobile-landscape:text-sm hover:bg-black/60"
                      >
                        Open Fullscreen VR
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mobile-landscape:text-2xl mb-2">🏠</div>
                        <div className="mobile-landscape:text-sm">360° View</div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 mobile-landscape:text-sm">{samplePropertyData.virtualTours.tours360[0]?.description || 'Interactive interior walkthrough'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">360° Interior (minimalist)</h3>
                <div className="bg-black/50 rounded-lg h-64 mobile-landscape:h-40 overflow-hidden mb-4 mobile-landscape:mb-2 relative group">
                  {samplePropertyData.virtualTours.tours360[0]?.embedUrl ? (
                    <>
                      <iframe
                        src={samplePropertyData.virtualTours.tours360[0].embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        title="Minimalist Interior 360°"
                      />
                      <button
                        onClick={() => openTourModal(samplePropertyData.virtualTours.tours360[0])}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-semibold text-lg mobile-landscape:text-sm hover:bg-black/60"
                      >
                        Open Fullscreen VR
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mobile-landscape:text-2xl mb-2">🏠</div>
                        <div className="mobile-landscape:text-sm">360° View</div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 mobile-landscape:text-sm">Minimalist design interior walkthrough</p>
              </div>
            </div>
            

          </div>
        </section>

        {/* Fullscreen VR Modal */}
        {isModalOpen && selectedTour && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 mobile-landscape:p-2">
            <div className="relative w-full h-full max-w-7xl mobile-landscape:max-w-full max-h-[90vh] mobile-landscape:max-h-full bg-black rounded-lg mobile-landscape:rounded overflow-hidden">
              <button
                onClick={closeTourModal}
                className="absolute top-4 mobile-landscape:top-2 right-4 mobile-landscape:right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-3 mobile-landscape:p-2 rounded-full transition-colors duration-200 shadow-lg"
              >
                <svg className="w-6 h-6 mobile-landscape:w-4 mobile-landscape:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 mobile-landscape:top-2 left-4 mobile-landscape:left-2 z-10 bg-black/70 backdrop-blur-sm px-4 mobile-landscape:px-2 py-2 mobile-landscape:py-1 rounded-lg mobile-landscape:rounded">
                <h3 className="text-white font-semibold mobile-landscape:text-sm">{selectedTour.title}</h3>
                <p className="text-gray-300 text-sm mobile-landscape:text-xs">{selectedTour.description}</p>
              </div>
              <iframe
                src={selectedTour.embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title={selectedTour.title}
              />
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center p-8 mobile-landscape:p-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mobile-landscape:text-xl font-bold mb-6 mobile-landscape:mb-4 text-center">Contact Information</h2>
            <div className="grid grid-cols-2 mobile-landscape:grid-cols-1 gap-6 mobile-landscape:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">Sales Agent</h3>
                <div className="flex items-center space-x-4 mobile-landscape:space-x-2 mb-4 mobile-landscape:mb-2">
                  <img 
                    src={samplePropertyData.contact.agents[0]?.photo} 
                    alt={samplePropertyData.contact.agents[0]?.name} 
                    className="w-16 h-16 mobile-landscape:w-12 mobile-landscape:h-12 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold mobile-landscape:text-sm">{samplePropertyData.contact.agents[0]?.name}</h4>
                    <p className="text-gray-400 mobile-landscape:text-xs">{samplePropertyData.contact.agents[0]?.title}</p>
                  </div>
                </div>
                <div className="space-y-2 mobile-landscape:space-y-1">
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>📞</span>
                    <span>{samplePropertyData.contact.agents[0]?.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>✉️</span>
                    <span>{samplePropertyData.contact.agents[0]?.email}</span>
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mobile-landscape:p-4">
                <h3 className="text-xl mobile-landscape:text-lg font-semibold mb-4 mobile-landscape:mb-2">Sales Office</h3>
                <div className="space-y-2 mobile-landscape:space-y-1">
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>🏢</span>
                    <span>Sales Office</span>
                  </p>
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>📍</span>
                    <span>{samplePropertyData.contact.office.address}</span>
                  </p>
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>📞</span>
                    <span>{samplePropertyData.contact.office.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2 mobile-landscape:text-sm">
                    <span>🕒</span>
                    <span>{samplePropertyData.contact.office.hours[0]}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3D Model Fullscreen Modal */}
      {is3DModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <button
              onClick={close3DModal}
              className="absolute top-4 mobile-landscape:top-2 right-4 mobile-landscape:right-2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 mobile-landscape:p-1 rounded-full transition-colors duration-200 mobile-landscape:text-sm"
            >
              <svg className="w-6 h-6 mobile-landscape:w-4 mobile-landscape:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }} className="w-full h-full">
              <Suspense fallback={null}>
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <BeaksModelHighPoly />
                <OrbitControls ref={orbitControlsRef} enablePan={true} enableZoom={true} enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      )}

      {/* Floor Plan Modal */}
      {isFloorPlanModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div 
             className="absolute bg-white rounded-lg mobile-landscape:rounded shadow-2xl border border-gray-300"
             style={{
               left: modalPosition.x,
               top: modalPosition.y,
               width: modalSize.width,
               height: modalSize.height
             }}
           >
             {/* Title Bar */}
             <div 
               className="bg-gray-100 px-4 mobile-landscape:px-2 py-2 mobile-landscape:py-1 rounded-t-lg mobile-landscape:rounded-t flex justify-between items-center border-b cursor-move"
               onMouseDown={handleTitleBarMouseDown}
             >
               <span className="font-semibold mobile-landscape:text-sm text-gray-800">Floor Plan</span>
               <button
                 onClick={closeFloorPlanModal}
                 className="bg-red-500 hover:bg-red-600 text-white p-1 mobile-landscape:p-0.5 rounded transition-colors duration-200"
               >
                 <svg className="w-4 h-4 mobile-landscape:w-3 mobile-landscape:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
             
             {/* Content */}
              <div className="p-4 mobile-landscape:p-2 overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
                <img
                  src="/floorplan.png"
                  alt="Floor Plan"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            
            {/* Resize Handle */}
            <div 
              className="absolute bottom-0 right-0 w-4 h-4 mobile-landscape:w-3 mobile-landscape:h-3 bg-gray-400 cursor-se-resize"
              onMouseDown={handleResizeStart}
              style={{
                background: 'linear-gradient(-45deg, transparent 0%, transparent 30%, #9ca3af 30%, #9ca3af 70%, transparent 70%)'
              }}
            />
          </div>
        </div>
      )}

      {/* Full View Modal */}
      {isFullViewOpen && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative w-full h-full">
            <button
              onClick={closeFullView}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-x-20 z-[200] bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
               onClick={resetCamera}
               className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[200] bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </button>
            <button
               onClick={toggleAutoOrbit}
               className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-x-20 z-[200] p-2 rounded-full transition-colors duration-200 ${
                 isAutoOrbit ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 hover:bg-white/30'
               } text-white`}
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 4.553c.12-.919.07-1.853-.148-2.75m-13.492 2.75c-.218-.897-.268-1.831-.148-2.75M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z" />
               </svg>
             </button>
            <Canvas
              camera={{ position: [0, 25, 15], fov: 60 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <BeaksModelHighPoly />
              </Suspense>
              <OrbitControls 
                ref={orbitControlsRef} 
                enablePan={true} 
                enableZoom={true} 
                enableRotate={true}
                onStart={() => setIsAutoOrbit(false)}
              />
              <AutoOrbitController />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
}