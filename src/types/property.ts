export interface PropertyData {
  // Overview Section
  overview: {
    name: string;
    tagline: string;
    heroImage: string;
    heroVideo?: string;
    price: number;
    currency: string;
    keySpecs: {
      bedrooms: string;
      bathrooms: string;
      sqft: number;
    };
    description: string;
    keyFeatures: string[]; // Max 6 items
  };
  
  // Location Section
  location: {
    address: string;
    coordinates: [number, number];
    nearbyAmenities: Array<{
      name: string;
      distance: string;
      category: string;
      icon: string;
    }>;
    transportationLinks: Array<{
      name: string;
      distance: string;
      type: 'bus' | 'train' | 'subway' | 'airport';
    }>;
    neighborhoodHighlights: string[];
  };
  
  // Units Section (Combined with floor plans)
  units: Array<{
    id: string;
    name: string;           // "1BR Deluxe"
    price: number;
    specs: {
      bedrooms: number;
      bathrooms: number;
      sqft: number;
    };
    floorPlan: string;      // Floor plan image
    gallery: string[];      // Unit-specific images
    features: string[];     // Unit-specific features
    availability: 'available' | 'sold' | 'reserved';
  }>;
  
  // Virtual Tours Section
  virtualTours: {
    tours3D: Array<{
      id: string;
      title: string;
      description: string;
      modelPath: string;
      thumbnail: string;
      duration: string;
      cameraPositions: Array<{
        name: string;
        position: [number, number, number];
        target: [number, number, number];
      }>;
    }>;
    tours360: Array<{
      id: string;
      title: string;
      description: string;
      embedUrl?: string;
      thumbnail: string;
      duration: string;
      aiHouseId?: string;
    }>;
  };
  
  // Contact Section
  contact: {
    agents: Array<{
      id: string;
      name: string;
      photo: string;
      phone: string;
      email: string;
      title: string;
      rating: number;
      experience: string;
    }>;
    office: {
      address: string;
      hours: string[];
      phone: string;
      email: string;
    };
  };
}

export interface NavigationSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  interestedUnit?: string;
  preferredContactTime: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

export interface MapboxConfig {
  accessToken: string;
  style: string;
  center: [number, number];
  zoom: number;
}