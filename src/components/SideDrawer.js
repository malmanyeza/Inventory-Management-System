import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Box, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'; // Robot icon
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const SideDrawer = ({ drawerWidth }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // To keep track of the selected menu item
  const menuItems = [
    { text: 'AI Assistant', path: '/', icon: <SmartToyOutlinedIcon /> }, // Robot icon for AI Assistant
    { text: 'Stats', path: '/stats', icon: <BarChartOutlinedIcon /> },
    { text: 'Inventory', path: '/inventory', icon: <Inventory2OutlinedIcon /> },
    { text: 'Customers', path: '/customers', icon: <GroupOutlinedIcon /> },
    { text: 'Place Order', path: '/place-order', icon: <ShoppingCartOutlinedIcon /> },
  ];

  const handleItemClick = (index) => {
    setSelectedIndex(index); // Update the selected index when an item is clicked
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white
            backdropFilter: 'blur(10px)', // Adds blur effect
            borderRadius: '20px', // Rounded corners
            margin: '10px', // Add spacing from edges
            height: '97%',
            paddingLeft: '10px',
            paddingRight: '10px',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={Link} // Change to Link from react-router-dom
              to={item.path}
              onClick={() => handleItemClick(index)} // Set the selected item
              sx={{
                color: '#ffffff', // Light text color
                borderRadius: '10px', // Rounded corners for hover effect
                margin: '5px 0', // Adding vertical space to separate list items
                paddingLeft: '20px', // Add padding to create space between text and drawer edge
                paddingRight: '20px', // Add padding to create space between text and drawer edge
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle hover effect
                  borderRadius: '10px', // Rounded corners on hover
                  paddingLeft: '20px', // Maintain the same padding during hover
                  paddingRight: '20px', // Maintain the same padding during hover
                },
                // Apply border and background for the selected button
                ...(selectedIndex === index && {
                  border: '2px solid rgba(255, 255, 255, 0.67)', // White border around the selected item
                  borderRadius: '10px', // Rounded corners for the selected item
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#ffffff', // Icon color
                  minWidth: '50px', // Adjust spacing for alignment
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'normal',
                      padding: '5px 10px', // Add padding to create rectangle for text
                      borderRadius: '10px', // Rounded corners for selected text
                      color: '#ffffff', // Text color
                    }}
                  >
                    {item.text}
                  </Typography>
                }
                sx={{
                  textAlign: 'left', // Align text to the left
                  ml: -2, // Adjust margin to align text with the icon
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Vertical Line */}
      <Box
        sx={{
          width: '1px', // Thin vertical line
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Faint color
          height: '100vh', // Full viewport height
          position: 'fixed', // Ensures it stays in place
          left: `${drawerWidth + 20}px`, // Position outside the drawer
          top: 0, // Aligns with the top
        }}
      />
    </Box>
  );
};

export default SideDrawer;
