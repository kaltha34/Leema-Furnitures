import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ThankYouStepProps {
  isSubmitting: boolean;
  submitSuccess: boolean;
  onReset: () => void;
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({ isSubmitting, submitSuccess, onReset }) => {
  // Auto-reset after 10 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        onReset();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onReset]);

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
          {isSubmitting ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={80} sx={{ mb: 4 }} />
              <Typography variant="h4">
                Submitting your information...
              </Typography>
            </Box>
          ) : submitSuccess ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 4 }} />
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Thank You for Visiting Us!
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, mb: 6 }}>
                Our team will assist you shortly.
              </Typography>
              <Typography variant="body1" sx={{ mt: 4, opacity: 0.7 }}>
                This screen will reset in a few seconds...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h3" component="h1" color="error" gutterBottom>
                Something went wrong
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                We couldn't save your information. Please try again.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={onReset}
                sx={{ py: 1.5, px: 4 }}
              >
                Try Again
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThankYouStep;
