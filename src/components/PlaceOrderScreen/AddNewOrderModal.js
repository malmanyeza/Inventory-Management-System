import React, { useState, useCallback, useMemo } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useOrders } from '../../context/OrdersContext';

const AddNewOrderModal = ({ open, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [items, setItems] = useState([{ id: 1, quantity: 1, product: '', price: 0, vat: 16 }]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomerData] = useState({
    tradeName: '',
    registeredName: '',
    vatNumber: '',
    tinNumber: '',
    email: '',
    phone: '',
    address: ''
  });

  const { addOrder } = useOrders();



  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now(), quantity: 1, product: '', price: 0, vat: 16 }]);
  }, []);


  const customers = [
    {
      id: 1,
      name: "OK Zimbabwe",
      tin: "1234-5678-901",
      vat: "VAT001",
      contact: "+263 77 1234567",
      address: "1 Main Street, Harare"
    },
    {
      id: 2,
      name: "Pick n Pay",
      tin: "2345-6789-012",
      vat: "VAT002",
      contact: "+263 77 2345678",
      address: "2 Secondary Road, Harare"
    },
    {
      id: 3,
      name: "Spar",
      tin: "3456-7890-123",
      vat: "VAT003",
      contact: "+263 77 3456789",
      address: "3 Tertiary Ave, Harare"
    },
    {
      id: 4,
      name: "TM Supermarket",
      tin: "4567-8901-234",
      vat: "VAT004",
      contact: "+263 77 4567890",
      address: "4 Quaternary Blvd, Harare"
    }
  ];

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

  const handleSubmit = async () => {
    const orderInfo = {
      companyDetails,       // your company info (static)
      customer: selectedCustomer || newCustomerData, // full customer details
      items,                // array of items
      subtotalExcl,         // calculated subtotal (excl. VAT)
      vatTotal,             // calculated VAT total
      invoiceTotal,         // calculated invoice total
      // any additional fields
    };
  
    try {
      await addOrder(orderInfo);
      onClose(); // Close the modal upon successful order submission
    } catch (error) {
      // Handle submission error (e.g., display a message)
      console.error("Order submission failed", error);
    }
  };

  
  // Calculate totals
  const subtotalExcl = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const vatTotal = items.reduce((sum, item) => sum + (item.quantity * item.price * item.vat/100), 0);
  const invoiceTotal = subtotalExcl + vatTotal;

  // Styled dropdown props for consistent look
  const dropdownProps = useMemo(() => ({
    sx: {
      color: '#fff',
      '& .MuiSelect-select': { minHeight: '42px' },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }
    },
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          '& .MuiMenuItem-root': {
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }
        }
      }
    }
  }), []);

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '90vh',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          p: 3,
          backgroundColor: 'rgba(255,255,255,0.05)',
          flexShrink: 0
        }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Create New Order</Typography>
          <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{
          overflowY: 'auto',
          px: 3,
          pb: 3,
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.3)',
          }
        }}>
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
            
            <TextField
              type="date"
              label="Order Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#fff' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
              }}
            />
            
            {Object.entries(companyDetails).map(([key, value]) => (
              editMode ? (
                <TextField
                  key={key}
                  label={key}
                  defaultValue={value}
                  fullWidth
                  sx={{ 
                    mb: 1, 
                    '& .MuiInputBase-input': { color: '#fff' },
                    '& .MuiInputLabel-root': { color: '#fff' }
                  }}
                />
              ) : (
                <Typography 
                  key={key} 
                  variant="body2" 
                  sx={{ 
                    color: '#fff', 
                    mb: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
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
                  value={selectedCustomer ? selectedCustomer.id : ""}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    const cust = customers.find(customer => customer.id === id);
                    setSelectedCustomer(cust);
                  }}
                  fullWidth
                  displayEmpty
                  {...dropdownProps}
                >
                  <MenuItem value="">Select Customer</MenuItem>
                  {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id} sx={{ color: '#fff' }}>
                      {customer.name}
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
                {Object.entries(newCustomerData).map(([key, value]) => (
                  <TextField
                    key={key}
                    label={key}
                    value={value}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      newCustomerData[name] = value;
                    }}
                    fullWidth
                    sx={{ 
                      mb: 2, 
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#fff' }
                    }}
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
                <TableHead
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    flexShrink: 0
                  }}
                >
                  <TableRow>
                    {['Quantity', 'Product', 'Unit Price', 'VAT %', 'Total (excl)', 'Total (incl)'].map(header => (
                      <TableCell 
                        key={header} 
                        sx={{ 
                          color: '#fff', 
                          borderColor: 'rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                        <TextField 
                          type="number" 
                          defaultValue={1} 
                          sx={{ width: 70, '& .MuiInputBase-input': { color: '#fff' } }} 
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Select 
                          {...dropdownProps}
                        >
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

            <Button 
              onClick={handleAddItem}
              startIcon={<AddIcon />} 
              sx={{ 
                color: '#fff', 
                mt: 2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
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
        </Box>

        {/* Footer */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2,
          p: 3,
          backgroundColor: 'rgba(255,255,255,0.05)',
          flexShrink: 0
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#fff', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              minWidth: 100
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              minWidth: 100
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