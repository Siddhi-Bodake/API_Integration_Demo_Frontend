import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Paper, 
  CircularProgress, 
  Avatar,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { chatService } from '../../api/api';
import { ChatMessage } from '../../types';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: message
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);
    
    try {
      const response = await chatService.sendMessage(message);
      const botText = response.data.candidates[0].content.parts[0].text;
      
      // Add bot response to chat
      const botMessage: ChatMessage = {
        role: 'bot',
        content: botText
      };
      
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'bot',
        content: 'Sorry, I encountered an error processing your request.'
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh', maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Chat with Genie
      </Typography>
      
      {/* Chat Messages */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 2, 
          flexGrow: 1, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {chatHistory.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography color="text.secondary">
              Start a conversation with Genie
            </Typography>
          </Box>
        ) : (
          chatHistory.map((chat, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                mb: 2,
                alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}
            >
              {chat.role === 'bot' && (
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <SmartToyIcon />
                </Avatar>
              )}
              
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  backgroundColor: chat.role === 'user' ? 'primary.light' : 'background.paper',
                  color: chat.role === 'user' ? 'white' : 'text.primary',
                  borderRadius: 2
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {chat.content}
                </Typography>
              </Paper>
              
              {chat.role === 'user' && (
                <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          ))
        )}
        
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <SmartToyIcon />
            </Avatar>
            <CircularProgress size={24} />
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Paper>
      
      {/* Message Input */}
      <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <IconButton 
          color="primary" 
          type="submit" 
          disabled={loading || !message.trim()} 
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInterface;