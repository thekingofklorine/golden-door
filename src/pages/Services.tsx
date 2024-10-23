import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import data from '../resources/fake_data.json'; // Import the JSON data
import { FilterCriteria, filterHomes, Location } from '../filter'; // Import the filter function and Location interface

// Define the style for the map container
const mapContainerStyle = {
  width: '100%',
  height: '400px',
  margin: '0 auto',
  position: 'relative' as 'relative', // Explicitly type the position property
};

// Set default center coordinates for the map
const center = {
  lat: 36.368729854037625, // Default to Centerton
  lng: -94.28376217185604,
};

const Services: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string, // Use .env API key
  });

  // State for checkboxes
  const [showIncome, setShowIncome] = useState(false);
  const [showHousePrice, setShowHousePrice] = useState(false);
  const [showMoveInDate, setShowMoveInDate] = useState(false);

  const [mapCenter, setMapCenter] = useState(center); // State for map center
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // State for the selected location
  const [criteria, setCriteria] = useState<FilterCriteria>({}); // State for filter criteria
  const [filteredData, setFilteredData] = useState<Location[]>(data); // State for filtered data
  const [showMatchPercentage, setShowMatchPercentage] = useState(false); // State for match percentage toggle

  useEffect(() => {
    console.log('Data loaded:', data); // Check the loaded data
    setFilteredData(data); // Initialize filteredData with the full dataset
  }, []); // Log data on mount

  useEffect(() => {
    console.log('Filter criteria changed:', criteria); // Log criteria changes
    const filtered = filterHomes(criteria);
    console.log('Filtered data:', filtered); // Log filtered data
    setFilteredData(filtered);
  }, [criteria]);

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

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const getMarkerColor = (location: Location): string => {
    let matchCount = 0;
    if ((criteria.minIncome && location.income >= criteria.minIncome)&& (criteria.maxIncome && location.income <= criteria.maxIncome)) matchCount++;
    if ((criteria.minHousePrice && location.house_price >= criteria.minHousePrice )&& (criteria.maxHousePrice && location.house_price <= criteria.maxHousePrice)) matchCount++;
    if (criteria.moveInDate && new Date(location.move_in_date) >= new Date(criteria.moveInDate) && new Date(location.move_in_date) <= new Date()) matchCount++;

    switch (matchCount) {
      case 3:
        return 'green';
      case 2:
        return 'yellow';
      case 1:
        return 'red';
      default:
        return 'black';
    }
  };

  const checkMatch = (location: Location, criteria: FilterCriteria) => {
    return {
      income: criteria.minIncome || criteria.maxIncome
        ? (!criteria.minIncome || location.income >= criteria.minIncome) &&
          (!criteria.maxIncome || location.income <= criteria.maxIncome)
          ? '✅'
          : '❌'
        : '➖',
      housePrice: criteria.minHousePrice || criteria.maxHousePrice
        ? (!criteria.minHousePrice || location.house_price >= criteria.minHousePrice) &&
          (!criteria.maxHousePrice || location.house_price <= criteria.maxHousePrice)
          ? '✅'
          : '❌'
        : '➖',
      moveInDate: criteria.moveInDate
        ? (new Date(location.move_in_date) >= new Date(criteria.moveInDate) &&
           new Date(location.move_in_date) <= new Date())
          ? '✅'
          : '❌'
        : '➖',
    };
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h1>Our Service Locations</h1>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '20px' }}>
        {/* Filter Checkboxes */}
        <div style={{ textAlign: 'center' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={showIncome}
              onChange={() => setShowIncome(!showIncome)}
            />
            Filter by Income
          </label>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={showHousePrice}
              onChange={() => setShowHousePrice(!showHousePrice)}
            />
            Filter by House Price
          </label>
          <label>
            <input
              type="checkbox"
              checked={showMoveInDate}
              onChange={() => setShowMoveInDate(!showMoveInDate)}
            />
            Filter by Move-in Date
          </label>

          {/* Filter Inputs */}
          <div style={{ marginTop: '10px' }}>
            {showIncome && (
              <>
                <input
                  type="number"
                  name="minIncome"
                  placeholder="Min Income"
                  onChange={handleCriteriaChange}
                  style={{ padding: '10px', marginRight: '10px' }}
                />
                <input
                  type="number"
                  name="maxIncome"
                  placeholder="Max Income"
                  onChange={handleCriteriaChange}
                  style={{ padding: '10px', marginRight: '10px' }}
                />
              </>
            )}
            {showHousePrice && (
              <>
                <input
                  type="number"
                  name="minHousePrice"
                  placeholder="Min House Price"
                  onChange={handleCriteriaChange}
                  style={{ padding: '10px', marginRight: '10px' }}
                />
                <input
                  type="number"
                  name="maxHousePrice"
                  placeholder="Max House Price"
                  onChange={handleCriteriaChange}
                  style={{ padding: '10px', marginRight: '10px' }}
                />
              </>
            )}
            {showMoveInDate && (
              <input
                type="date"
                name="moveInDate"
                placeholder="Move-in Date"
                onChange={handleCriteriaChange}
                style={{ padding: '10px', marginRight: '10px' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Toggle for Show Match Percentage */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label>
          <input
            type="checkbox"
            checked={showMatchPercentage}
            onChange={() => setShowMatchPercentage(!showMatchPercentage)}
          />
          Show Match Percentage
        </label>
      </div>

      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={mapCenter}>
        {showMatchPercentage
          ? data.map((location: Location, index: number) => (
              <Marker
                key={index}
                position={{ lat: location.latitude, lng: location.longitude }}
                title={location.name}
                onClick={() => handleMarkerClick(location)} // Set click handler
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: getMarkerColor(location),
                  fillOpacity: 1,
                  strokeWeight: 1,
                }}
              />
            ))
          : filteredData.map((location: Location, index: number) => (
              <Marker
                key={index}
                position={{ lat: location.latitude, lng: location.longitude }}
                title={location.name}
                onClick={() => handleMarkerClick(location)} // Set click handler
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: getMarkerColor(location), // Use getMarkerColor here as well
                  fillOpacity: 1,
                  strokeWeight: 1,
                }}
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
          <p>
            <strong>Income:</strong> ${selectedLocation.income.toLocaleString()}
            {checkMatch(selectedLocation, criteria).income}
          </p>
          <p>
            <strong>House Price:</strong> ${selectedLocation.house_price.toLocaleString()}
            {checkMatch(selectedLocation, criteria).housePrice}
          </p>
          <p>
            <strong>Move-In Date:</strong> {selectedLocation.move_in_date}
            {checkMatch(selectedLocation, criteria).moveInDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default Services;