import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

function App() {
  const [messages, setMessages] = useState([]);

  const handleMessageSend = (message, response) => {
    setMessages([...messages, { sender: 'user', message }, { sender: 'bot', message: response }]);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <ChatWindow messages={messages} />
        <Box mt={5}>
          <MessageInput onSendMessage={handleMessageSend} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
