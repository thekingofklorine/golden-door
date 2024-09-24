import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { ListItemButton } from '@mui/material';

import './App.css';

// Import the page components
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(`/golden-door${path}`); // Prepend the base path
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
      {/* AppBar with Menu Icon and Title */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Golden Door
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer with Navigation Links */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      {/* Define Routes for Navigation */}
      <Routes>
        <Route path="/golden-door/" element={<Home />} /> {/* Ensure this is correct */}
        <Route path="/golden-door/about" element={<About />} />
        <Route path="/golden-door/services" element={<Services />} />
        <Route path="/golden-door/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
