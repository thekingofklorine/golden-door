import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// Get the root element
const rootElement = document.getElementById('root')!; // Non-null assertion to avoid TypeScript error
const root = createRoot(rootElement); // Create root using createRoot

// Render the App inside BrowserRouter with a basename for routing
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/golden-door"> {/* Set the basename here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: If you're using reportWebVitals, ensure it's typed
// reportWebVitals();
