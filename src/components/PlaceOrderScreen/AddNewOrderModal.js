import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddNewOrderModal = ({ open, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [items, setItems] = useState([{ id: 1, quantity: 1, product: '', price: 0, vat: 16 }]);
  
  // Sample company details
  const [companyDetails] = useState({
    name: "Mazoe Holdings",
    email: "sales@mazoe.co.zw",
    address: "123 Enterprise Rd, Harare",
    phone: "+263 242 123 456",
    tin: "1234-5678-90",
    vat: "VAT123456",
    salesPerson: "John Doe"
  });

  // Sample customers
  const customers = ["OK Zimbabwe", "Pick n Pay", "Spar", "TM Supermarket"];
  
  // Calculate totals
  const subtotalExcl = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const vatTotal = items.reduce((sum, item) => sum + (item.quantity * item.price * item.vat/100), 0);
  const invoiceTotal = subtotalExcl + vatTotal;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '10px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Create New Order</Typography>
          <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </Box>

        {/* Section 1: Company Details */}
        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>Company Details</Typography>
            <Button 
              size="small" 
              onClick={() => setEditMode(!editMode)}
              sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              {editMode ? 'Save' : 'Edit'}
            </Button>
          </Box>
          
          {/* <DatePicker
            label="Order Date"
            sx={{ width: '100%', mb: 2, '& .MuiInputBase-root': { color: '#fff' } }}
          /> */}
          
          {Object.entries(companyDetails).map(([key, value]) => (
            editMode ? (
              <TextField
                key={key}
                label={key}
                defaultValue={value}
                fullWidth
                sx={{ mb: 1, '& .MuiInputBase-input': { color: '#fff' } }}
              />
            ) : (
              <Typography key={key} variant="body2" sx={{ color: '#fff', mb: 1 }}>
                {`${key}: ${value}`}
              </Typography>
            )
          ))}
        </Box>

        {/* Section 2: Customer Details */}
        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2 }}>Customer Details</Typography>
          
          {!isNewCustomer ? (
            <>
              <Select
                fullWidth
                displayEmpty
                sx={{ mb: 2, color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
              >
                <MenuItem value="">Select Customer</MenuItem>
                {customers.map(customer => (
                  <MenuItem key={customer} value={customer} sx={{ color: '#fff' }}>
                    {customer}
                  </MenuItem>
                ))}
              </Select>
              <Button 
                onClick={() => setIsNewCustomer(true)}
                sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Add New Customer
              </Button>
            </>
          ) : (
            <>
              {['Company Name', 'Address', 'Email', 'Phone'].map(field => (
                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  sx={{ mb: 1, '& .MuiInputBase-input': { color: '#fff' } }}
                />
              ))}
              <Button 
                onClick={() => setIsNewCustomer(false)}
                sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>

        {/* Section 3: Order Items */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2 }}>Order Items</Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Quantity', 'Product', 'Unit Price', 'VAT %', 'Total (excl)', 'Total (incl)'].map(header => (
                    <TableCell key={header} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <TextField type="number" defaultValue={1} sx={{ width: 70 }} />
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                      <Select sx={{ color: '#fff', minWidth: 120 }}>
                        <MenuItem value="" sx={{ color: '#fff' }}>Select Product</MenuItem>
                        <MenuItem value="mazoe" sx={{ color: '#fff' }}>Mazoe Orange</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>$10.00</TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>16%</TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>$10.00</TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>$11.60</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button startIcon={<AddIcon />} sx={{ color: '#fff', mt: 2 }}>
            Add Item
          </Button>

          {/* Totals */}
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Subtotal (excl): ${subtotalExcl.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              VAT Total: ${vatTotal.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Invoice Total: ${invoiceTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Save Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewOrderModal;