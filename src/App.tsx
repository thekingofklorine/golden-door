import React, { useState } from 'react'; 
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, Divider, useMediaQuery, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { ListItemButton } from '@mui/material';
import './App.css';
import menuLogo from "../src/resources/doorlogo32.png";

// Import the page components
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Detect screen size for mobile or desktop
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close the drawer after navigating
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => handleNavigation('/')}>
          Home
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/about')}>
          About
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/services')}>
          Services
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/contact')}>
          Contact
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="App">
      {/* AppBar with Menu Icon, Logo, and Title */}
      <AppBar position="fixed" sx={{ backgroundColor: 'var(--paynes-gray)', zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side: Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={menuLogo} alt="Golden Door Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
            <Typography variant="h6" component="div" sx={{ color: 'var(--ash-gray)' }}>
              Golden Door
            </Typography>
          </Box>

          {/* Right Side: Desktop or Mobile Menu */}
          {isMobile ? (
            <IconButton
              edge="end"
              sx={{ color: 'var(--ash-gray)' }}
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button sx={{ color: 'var(--ash-gray)' }} onClick={() => handleNavigation('/')}>
                Home
              </Button>
              <Button sx={{ color: 'var(--ash-gray)' }} onClick={() => handleNavigation('/about')}>
                About
              </Button>
              <Button sx={{ color: 'var(--ash-gray)' }} onClick={() => handleNavigation('/services')}>
                Services
              </Button>
              <Button sx={{ color: 'var(--ash-gray)' }} onClick={() => handleNavigation('/contact')}>
                Contact
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer with Navigation Links for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ zIndex: 1400 }} // Set a higher z-index for the drawer
      >
        {drawerContent}
      </Drawer>

      {/* Define Routes */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
