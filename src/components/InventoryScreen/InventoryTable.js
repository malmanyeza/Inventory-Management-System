import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const InventoryTable = ({ inventory }) => {
  return (
    <TableContainer
      component={Box}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white
        backdropFilter: 'blur(10px)', // Adds blur effect
        borderRadius: '20px', // Rounded corners
        margin: '10px', // Spacing around the table
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '98%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {['Stock ID', 'Name', 'Quantity', 'Category', 'Price', 'Percentage Sold'].map((header) => (
              <TableCell
                key={header}
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {inventory.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // Thin line between rows
                '&:last-child td': { borderBottom: 'none' }, // Remove border for the last row
              }}
            >
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{item.id}</TableCell>
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{item.name}</TableCell>
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{item.quantity}</TableCell>
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{item.category}</TableCell>
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{`$${item.price.toFixed(2)}`}</TableCell>
              <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>{`${item.percentageSold}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
