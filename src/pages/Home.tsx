import React, { useEffect } from 'react';
import doorLogo from '../resources/doorlogo192.png'; // Adjust the path as necessary
import './Home.css'; // Import the specific CSS for the Home page

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      // You can implement any scroll-related logic here if needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Background div is applied here */}
      <div className="background"></div>

      {/* Overlay for translucency */}
      <div className="overlay"></div>

      {/* Content of the Home page */}
      <div className="content-container">
        <h1>Welcome to the Home Page</h1>
        <img 
          src={doorLogo} 
          alt="Golden Door Logo" 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      </div>

      {/* Additional containers with filler text */}
      <div className="content-container">
        <div className="content-section">
          <h2>Section 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, urna eu tincidunt congue, nisi nisl aliquet nulla, eu fermentum libero sapien ut elit.</p>
        </div>
        <div className="content-section">
          <h2>Section 2</h2>
          <p>Integer in ante vitae lacus fermentum pellentesque. Vivamus lacinia odio vitae vestibulum. Morbi ac velit quis justo tincidunt volutpat ut et est.</p>
        </div>
        <div className="content-section">
          <h2>Section 3</h2>
          <p>Aenean aliquam, metus sit amet tincidunt sollicitudin, eros nunc blandit lectus, nec laoreet urna leo a nunc. Sed faucibus metus ac orci dignissim, ut hendrerit sapien fermentum.</p>
        </div>
        <div className="content-section">
          <h2>Section 4</h2>
          <p>Fusce sed lectus ac libero varius scelerisque. Nulla facilisi. Morbi id libero metus. Suspendisse potenti. Integer ut erat ac libero tempus varius.</p>
        </div>
        <div className="content-section">
          <h2>Section 5</h2>
          <p>Curabitur in risus felis. Nunc ac nisi scelerisque, consequat purus at, facilisis leo. Donec convallis vitae nunc non luctus. Etiam ac elit at arcu bibendum vestibulum.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
