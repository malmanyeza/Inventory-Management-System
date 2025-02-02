// InventoryTableHeader.jsx
import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Add, Download, FilterList, ExpandMore } from '@mui/icons-material';

const InventoryTableHeader = ({ onAddProduct, onExportPdf, onApplyFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const buttonStyle = {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
    borderRadius: '5px',
    padding: '8px 12px',
    marginRight: '10px',
    textTransform: 'none',
    fontSize: '0.9rem',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Button
        startIcon={<Add />}
        onClick={onAddProduct}
        sx={buttonStyle}
      >
        Add Product
      </Button>

      <Button
        startIcon={<Download />}
        onClick={onExportPdf}
        sx={buttonStyle}
      >
        Export PDF
      </Button>

      <Button
        startIcon={<FilterList />}
        endIcon={<ExpandMore />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={buttonStyle}
      >
        Filter
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {['Category', 'Price Range', 'Quantity'].map((filter) => (
          <MenuItem
            key={filter}
            onClick={() => {
              onApplyFilter(filter);
              setAnchorEl(null);
            }}
            sx={{
              fontSize: '0.9rem',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
            }}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default InventoryTableHeader;