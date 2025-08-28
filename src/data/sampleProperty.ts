import { PropertyData } from '@/types/property';

export const samplePropertyData: PropertyData = {
  overview: {
    name: "RESIDENSI MADANI SERUNAI",
    tagline: "Luxury Living Redefined",
    heroImage: "/mardini-01.png",
    heroVideo: "/videos/hero-video.mp4",
    price: 300000,
    currency: "MYR",
    keySpecs: {
      bedrooms: "1-3",
      bathrooms: "1-2",
      sqft: 1200
    },
    description: "Experience unparalleled luxury in the heart of the city. RESIDENSI MADANI SERUNAI offers modern amenities, stunning views, and premium finishes in every unit.",
    keyFeatures: [
      "Floor-to-ceiling windows",
      "Premium hardwood flooring",
      "Gourmet kitchen with quartz countertops",
      "In-unit washer and dryer",
      "24/7 concierge service",
      "Rooftop terrace with city views"
    ]
  },
  
  location: {
    address: "123 Downtown Boulevard, Metropolitan City, MC 12345",
    coordinates: [-74.006, 40.7128], // NYC coordinates as example
    nearbyAmenities: [
      {
        name: "Central Park",
        distance: "0.3 miles",
        category: "Recreation",
        icon: "🌳"
      },
      {
        name: "Metropolitan Museum",
        distance: "0.5 miles",
        category: "Culture",
        icon: "🏛️"
      },
      {
        name: "Whole Foods Market",
        distance: "0.2 miles",
        category: "Shopping",
        icon: "🛒"
      },
      {
        name: "City Hospital",
        distance: "0.8 miles",
        category: "Healthcare",
        icon: "🏥"
      },
      {
        name: "Elite Fitness Center",
        distance: "0.1 miles",
        category: "Fitness",
        icon: "💪"
      }
    ],
    transportationLinks: [
      {
        name: "Metro Station",
        distance: "2 blocks",
        type: "subway"
      },
      {
        name: "Bus Stop",
        distance: "1 block",
        type: "bus"
      },
      {
        name: "JFK Airport",
        distance: "45 minutes",
        type: "airport"
      }
    ],
    neighborhoodHighlights: [
      "Vibrant arts district",
      "Award-winning restaurants",
      "Historic architecture",
      "Safe, walkable streets"
    ]
  },
  
  units: [
    {
      id: "1br-deluxe",
      name: "1BR Deluxe",
      price: 250000,
      specs: {
        bedrooms: 1,
        bathrooms: 1,
        sqft: 850
      },
      floorPlan: "/images/floorplans/1br-deluxe.jpg",
      gallery: [
        "/room.png",
        "/images/units/1br/bedroom.jpg",
        "/images/units/1br/kitchen.jpg",
        "/images/units/1br/bathroom.jpg"
      ],
      features: [
        "Open-concept living",
        "Walk-in closet",
        "Private balcony",
        "Stainless steel appliances"
      ],
      availability: "available"
    },
    {
      id: "2br-premium",
      name: "2BR Premium",
      price: 300000,
      specs: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200
      },
      floorPlan: "/images/floorplans/2br-premium.jpg",
      gallery: [
        "/room.png",
        "/images/units/2br/master-bedroom.jpg",
        "/images/units/2br/second-bedroom.jpg",
        "/images/units/2br/kitchen.jpg",
        "/images/units/2br/master-bath.jpg"
      ],
      features: [
        "Master suite with ensuite",
        "Separate dining area",
        "Two private balconies",
        "Premium appliance package",
        "Custom built-ins"
      ],
      availability: "available"
    },
    {
      id: "3br-penthouse",
      name: "3BR Penthouse",
      price: 350000,
      specs: {
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800
      },
      floorPlan: "/images/floorplans/3br-penthouse.jpg",
      gallery: [
        "/room.png",
        "/images/units/3br/master-bedroom.jpg",
        "/images/units/3br/second-bedroom.jpg",
        "/images/units/3br/third-bedroom.jpg",
        "/images/units/3br/kitchen.jpg",
        "/images/units/3br/terrace.jpg"
      ],
      features: [
        "Private rooftop terrace",
        "Floor-to-ceiling windows",
        "Gourmet kitchen island",
        "Master suite with walk-in closet",
        "Panoramic city views",
        "Smart home automation"
      ],
      availability: "reserved"
    }
  ],
  
  virtualTours: {
    tours3D: [
      {
        id: "building-exterior",
        title: "Building Exterior",
        description: "Explore the stunning exterior architecture",
        modelPath: "/models/building-exterior.glb",
        thumbnail: "/images/tours/exterior-thumb.jpg",
        duration: "3-5 min",
        cameraPositions: [
          {
            name: "Front View",
            position: [0, 5, 15],
            target: [0, 8, 0]
          },
          {
            name: "Side View",
            position: [15, 8, 5],
            target: [0, 8, 0]
          },
          {
            name: "Aerial View",
            position: [10, 20, 10],
            target: [0, 0, 0]
          }
        ]
      },
      {
        id: "unit-interior",
        title: "Unit Interior 3D",
        description: "Walk through a fully furnished unit",
        modelPath: "/models/unit-interior.glb",
        thumbnail: "/images/tours/interior-3d-thumb.jpg",
        duration: "5-7 min",
        cameraPositions: [
          {
            name: "Living Room",
            position: [0, 2, 5],
            target: [0, 1, 0]
          },
          {
            name: "Kitchen",
            position: [3, 2, 2],
            target: [0, 1, 0]
          },
          {
            name: "Bedroom",
            position: [-2, 2, 3],
            target: [0, 1, 0]
          }
        ]
      },
      {
        id: "madani-exterior",
        title: "MADANI Exterior 3D",
        description: "Explore the stunning MADANI building exterior",
        modelPath: "https://antlogic.ai/MADANI_map.glb",
        thumbnail: "/images/tours/madani-exterior-thumb.jpg",
        duration: "4-6 min",
        cameraPositions: [
          {
            name: "Front Entrance",
            position: [0, 8, 20],
            target: [0, 10, 0]
          },
          {
            name: "Side Perspective",
            position: [20, 12, 8],
            target: [0, 10, 0]
          },
          {
            name: "Bird's Eye View",
            position: [15, 25, 15],
            target: [0, 5, 0]
          }
        ]
      }
    ],
    tours360: [
      {
        id: "living-room-360",
        title: "Living Room 360°",
        description: "Immersive 360° view of the living space",
        embedUrl: "https://www.aihouse.com/720/QQO202507310000000000000925860600",
        thumbnail: "/images/360/living-room-thumb.jpg",
        duration: "Interactive",
        aiHouseId: "QQO202507310000000000000925860600"
      },
      {
        id: "kitchen-360",
        title: "Gourmet Kitchen 360°",
        description: "Experience the modern kitchen design",
        embedUrl: "https://www.aihouse.com/720/QQO202507310000000000000925860601",
        thumbnail: "/images/360/kitchen-thumb.jpg",
        duration: "Interactive",
        aiHouseId: "QQO202507310000000000000925860601"
      },
      {
        id: "bedroom-360",
        title: "Master Bedroom 360°",
        description: "Relax in the spacious master suite",
        embedUrl: "https://www.aihouse.com/720/QQO202507310000000000000925860602",
        thumbnail: "/images/360/bedroom-thumb.jpg",
        duration: "Interactive",
        aiHouseId: "QQO202507310000000000000925860602"
      }
    ]
  },
  
  contact: {
    agents: [
      {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        photo: "/images/agent/sarah-johnson.jpg",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@residensimadaniserunai.com",
        title: "Senior Sales Associate",
        rating: 4.9,
        experience: "8+ years"
      },
      {
        id: "michael-chen",
        name: "Michael Chen",
        photo: "/images/agent/michael-chen.jpg",
        phone: "+1 (555) 234-5678",
        email: "michael.chen@residensimadaniserunai.com",
        title: "Property Specialist",
        rating: 4.8,
        experience: "5+ years"
      }
    ],
    office: {
      address: "456 Real Estate Plaza, Metropolitan City, MC 12346",
      hours: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: By appointment"
      ],
      phone: "+1 (555) 987-6543",
      email: "info@residensimadaniserunai.com"
    }
  }
};