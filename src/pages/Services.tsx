import React, { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// Define the style for the map container
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Set default center coordinates for the map
const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

const Services: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, // Use .env API key
  });

  const [mapCenter, setMapCenter] = useState(center); // State for map center

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCode = e.target.value;
    if (zipCode.length === 5) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data); // Log the entire response for debugging
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log('Fetched location:', location); // Debugging line
            setMapCenter({
              lat: location.lat,
              lng: location.lng,
            });
          } else {
            console.error('No results found for this zip code');
          }
        })
        .catch((err) => {
          console.error('Error fetching location data:', err);
        });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h1>Our Service Locations</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter ZIP code"
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '200px',
            fontSize: '16px',
          }}
        />
      </div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={mapCenter}>
        {/* Marker functionality has been removed */}
      </GoogleMap>
    </div>
  );
};

export default Services;
