import React from 'react';
import doorLogo from '../resources/doorlogo192.png'; // Adjust the path as necessary


function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <img 
        src={doorLogo} 
        alt="Golden Door Logo" 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
    </div>
  );
}

export default Home;
