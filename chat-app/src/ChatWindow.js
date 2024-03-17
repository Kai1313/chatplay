import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const ChatWindow = ({ messages }) => {
  return (
    <Box maxWidth="md" width="100%" overflow="auto">
      <Card variant="outlined">
        <CardContent>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              mb={1}
            >
              <Box
                bgcolor={message.sender === 'user' ? "#e3f2fd" : "#f0f4c3"}
                p={1}
                borderRadius={8}
                maxWidth="70%"
              >
                <Typography>{message.message}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatWindow;
