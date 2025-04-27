import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import SearchInterface from '../components/Search/SearchInterface';
import { SearchResponse } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchResults = (results: SearchResponse) => {
    // Navigate to search results page with the query as a URL parameter
    navigate(`/search?q=${encodeURIComponent(results.autopromptString)}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        py: 8
      }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Genie
        </Typography>
        
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600 }}>
          Your AI-powered search assistant. Find information and chat with Genie about anything.
        </Typography>
        
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <SearchInterface onSearchResults={handleSearchResults} />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;