import React from 'react';
import { Box, Typography } from '@mui/material';

const Chats = ({ messages }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        maxWidth: '700px',
        width: '100%',
        margin: '0 auto', // Center the chat component horizontally
        height: '100%',
        overflowY: 'auto', // Scrollable if content overflows
        borderRadius: '10px',
      }}
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          {message.sender === 'user' ? (
            <Box
              sx={{
                backgroundColor: '#4caf50', // User message background color (green)
                color: '#fff', // Text color
                borderRadius: '10px',
                padding: '10px 15px',
                maxWidth: '70%', // 70% width for user messages
                textAlign: 'left',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add subtle shadow
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: '#f1f1f1', // AI message background color (light gray)
                color: '#000', // Text color
                borderRadius: '10px',
                padding: '10px 15px',
                width: '100%', // 100% width for AI messages
                textAlign: 'left',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Chats;
