import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        sx={{ 
          maxWidth: '100%', 
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 4
        }}
      >
        <CardContent>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome to Leema Furniture!
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 6 }}>
              Let us know how we can help you today.
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={onNext}
            sx={{ 
              py: 2, 
              px: 8, 
              fontSize: '1.5rem',
              borderRadius: '30px'
            }}
          >
            Start
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomeStep;
