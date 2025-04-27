import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        p: 2, 
        mt: 'auto', 
        backgroundColor: 'primary.light',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Genie - Your AI Search Assistant
      </Typography>
    </Box>
  );
};

export default Footer;