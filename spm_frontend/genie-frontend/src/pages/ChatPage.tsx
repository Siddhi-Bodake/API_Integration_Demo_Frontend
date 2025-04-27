import React from 'react';
import { Container } from '@mui/material';
import ChatInterface from '../components/Chat/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ChatInterface />
    </Container>
  );
};

export default ChatPage;