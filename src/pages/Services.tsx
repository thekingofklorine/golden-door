import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import data from '../resources/fake_data.json'; // Import the JSON data

// Define the style for the map container
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Set default center coordinates for the map
const center = {
  lat: 36.368729854037625, // Default to Centerton
  lng: -94.28376217185604,
};

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  income: number;
  house_price: number;
  move_in_date: string;
}

const Services: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, // Use .env API key
  });

  const [mapCenter, setMapCenter] = useState(center); // State for map center
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // State for the selected location

  useEffect(() => {
    console.log('Data loaded:', data); // Check the loaded data
  }, []); // Log data on mount

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location); // Set the selected location
  };

  const handleClose = () => {
    setSelectedLocation(null); // Close the info box
  };

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
        {data.map((location: Location, index: number) => (
          <Marker 
            key={index} 
            position={{ lat: location.latitude, lng: location.longitude }} 
            title={location.name}
            onClick={() => handleMarkerClick(location)} // Set click handler
          />
        ))}
      </GoogleMap>

      {/* Conditional rendering of selected location info */}
      {selectedLocation && (
        <div style={{ padding: '10px', background: 'white', position: 'absolute', top: '60px', left: '10px', zIndex: 1, borderRadius: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <button 
            onClick={handleClose} 
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'red' }}
          >
            X
          </button>
          <h2>{selectedLocation.name}</h2>
          <p><strong>Income:</strong> ${selectedLocation.income.toLocaleString()}</p>
          <p><strong>House Price:</strong> ${selectedLocation.house_price.toLocaleString()}</p>
          <p><strong>Move-In Date:</strong> {selectedLocation.move_in_date}</p>
        </div>
      )}
    </div>
  );
};

export default Services;