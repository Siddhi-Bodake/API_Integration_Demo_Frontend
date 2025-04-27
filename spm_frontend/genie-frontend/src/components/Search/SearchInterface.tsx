import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  CircularProgress, 
  InputAdornment,
  Typography 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchService } from '../../api/api';
import { SearchResponse } from '../../types';

interface SearchInterfaceProps {
  onSearchResults: (results: SearchResponse) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await searchService.search(query);
      onSearchResults(response.data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSearch} 
      sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Genie Search
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Ask anything and get instant results
      </Typography>
      
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={24} />
            </InputAdornment>
          ) : null
        }}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchInterface;