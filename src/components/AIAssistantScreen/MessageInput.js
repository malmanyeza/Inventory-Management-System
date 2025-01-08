import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage(''); // Clear the input field after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      handleSendMessage();
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically (if needed)
      position: 'relative',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      padding: '10px 15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '700px',
      width: '100%',
      margin: '0 auto', // Ensure the component is centered within its parent container
    }}
    >
  <TextField
    placeholder="Type your message here..."
    variant="standard"
    fullWidth
    multiline
    minRows={1}
    maxRows={4}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyPress={handleKeyPress}
    InputProps={{
      disableUnderline: true,
      sx: {
        padding: '10px',
        fontSize: '16px',
      },
    }}
  />
  <IconButton
    onClick={handleSendMessage}
    sx={{
      position: 'absolute',
      right: '10px',
      bottom: '10px',
      color: '#007bff',
      '&:hover': {
        color: '#0056b3',
      },
    }}
  >
    <SendOutlinedIcon />
  </IconButton>
</Box>

  );
};

export default MessageInput;
