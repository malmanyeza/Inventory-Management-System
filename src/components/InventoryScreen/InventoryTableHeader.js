import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InventoryTableHeader = ({ onAddProduct, onExportPdf, onApplyFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open filter menu
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close filter menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle filter option selection
  const handleFilterOption = (filter) => {
    console.log(`Filter applied: ${filter}`);
    alert(`Filter applied: ${filter}`); // Debugging purpose
    onApplyFilter(filter);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white
        backdropFilter: 'blur(10px)', // Adds blur effect
        borderRadius: '20px', // Rounded corners
        margin: '10px', // Spacing
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        zIndex: 10, // Ensure it's above other elements
        width: '98%',
      }}
    >
      {/* Add New Product Button */}
      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          console.log('Add New Product button clicked');
          alert('Add New Product button clicked'); // Debugging purpose
          onAddProduct && onAddProduct();
        }}
        sx={{
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          marginRight: '10px',
          borderRadius: '10px',
          padding: '8px 12px',
        }}
      >
        Add New Product
      </Button>

      {/* Export to PDF Button */}
      <Button
        startIcon={<DownloadIcon />}
        onClick={() => {
          console.log('Export to PDF button clicked');
          alert('Export to PDF button clicked'); // Debugging purpose
          onExportPdf && onExportPdf();
        }}
        sx={{
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          marginRight: '10px',
          borderRadius: '10px',
          padding: '8px 12px',
        }}
      >
        Export to PDF
      </Button>

      {/* Filter Button with Dropdown */}
      <Button
        endIcon={<ExpandMoreIcon />}
        startIcon={<FilterListIcon />}
        onClick={handleFilterClick}
        sx={{
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          borderRadius: '10px',
          padding: '8px 12px',
        }}
      >
        Filter
      </Button>

      {/* Filter Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#000000',
            borderRadius: '10px',
          },
        }}
      >
        <MenuItem onClick={() => handleFilterOption('Category')}>Category</MenuItem>
        <MenuItem onClick={() => handleFilterOption('Price Range')}>Price Range</MenuItem>
        <MenuItem onClick={() => handleFilterOption('Quantity')}>Quantity</MenuItem>
      </Menu>
    </Box>
  );
};

export default InventoryTableHeader;
