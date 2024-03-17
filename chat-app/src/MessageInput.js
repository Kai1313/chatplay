import React, { useState } from 'react';
import { Grid, Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim()) {
      setMessage('');
      onSendMessage(message)
      try {
        const response = await fetch('http://192.168.1.4:3001/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        const data = await response.json();
        onSendMessage(message, data.response); // Send both message and response
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      position="fixed"
      bottom={0}
      width="100%"
      p={2}
      bgcolor="background.paper"
      maxWidth="md"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            label="Type a message"
            value={message}
            onChange={handleMessageChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" fullWidth>
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageInput;
