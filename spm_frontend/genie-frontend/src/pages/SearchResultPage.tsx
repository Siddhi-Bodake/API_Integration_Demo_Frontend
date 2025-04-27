import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link as MuiLink,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { searchService } from '../api/api';
import { SearchResponse } from '../types';
import Loading from '../components/Common/Loading';
import SearchInterface from '../components/Search/SearchInterface';

const SearchResultsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await searchService.search(query);
        setSearchResults(response.data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleNewSearch = (results: SearchResponse) => {
    setSearchResults(results);
    const searchParams = new URLSearchParams();
    searchParams.set('q', results.autopromptString);
    navigate({ search: searchParams.toString() });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Home
      </Button>

      <SearchInterface onSearchResults={handleNewSearch} />

      <Divider sx={{ my: 4 }} />

      {loading ? (
        <Loading message="Searching..." />
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : searchResults && searchResults.results.length > 0 ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h5">
              Results for "{searchResults.autopromptString}"
            </Typography>
            <Chip
              label={`${searchResults.results.length} results found`}
              color="primary"
              variant="outlined"
            />
          </Box>

          <Grid container spacing={3}>
            {searchResults.results.map((result) => (
              <Grid item xs={12} sm={6} md={4} key={result.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {result.image && (
                    <CardMedia
                      component="img"
                      image={result.image}
                      alt={result.title}
                      sx={{ height: 160 }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {result.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {result.favicon && (
                        <img
                          src={result.favicon}
                          alt="favicon"
                          style={{ width: 16, height: 16, marginRight: 6 }}
                        />
                      )}
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {new URL(result.url).hostname}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      {result.publishedDate && (
                        <Typography variant="body2" color="text.secondary">
                          Published: {new Date(result.publishedDate).toLocaleDateString()}
                        </Typography>
                      )}
                      {result.author && (
                        <Typography variant="body2" color="text.secondary">
                          By: {result.author}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      component={MuiLink}
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      underline="none"
                    >
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          No search results to display.
        </Typography>
      )}
    </Container>
  );
};

export default SearchResultsPage;
