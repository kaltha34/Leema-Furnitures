import React from 'react';
import { Box } from '@mui/material';
import PremiumCustomerForm from '../components/form/PremiumCustomerForm';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <PremiumCustomerForm />
    </Box>
  );
};

export default HomePage;
