import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.05)',
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Box
            component="img"
            src="logo.png"
            alt="Leema Furniture"
            sx={{ height: 50, mr: 2, display: { xs: 'none', sm: 'block' } }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 600 }}>
            Leema Furniture
          </Typography>
        </Toolbar>
      </StyledAppBar>
      
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, sm: 9 } }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          {children}
        </Container>
      </Box>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          textAlign: 'center', 
          borderTop: '1px solid', 
          borderColor: 'divider',
          mt: 'auto'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Leema Furniture. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
