import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

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

  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center); // State for marker position

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
            setMarkerPosition({
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

  // Debugging: Log the marker position to see its current state
  console.log('Marker position:', markerPosition);

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
        {/* Using AdvancedMarkerElement */}
        <Marker
          position={markerPosition}
          // options={{
          //   icon: {
          //     url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker icon URL (optional)
          //     scaledSize: new window.google.maps.Size(30, 30), // Adjust size of the marker icon (optional)
          //   },
          // }}
        />
      </GoogleMap>
    </div>
  );
};

export default Services;
