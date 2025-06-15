import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper } from '@mui/material';
import { FormikProps } from 'formik';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface PurposeStepProps {
  formik: FormikProps<any>;
  onNext: () => void;
  onBack: () => void;
}

const PurposeStep: React.FC<PurposeStepProps> = ({ formik, onNext, onBack }) => {
  const purposes = [
    { 
      value: 'Just browsing', 
      label: 'Just browsing', 
      icon: <Box sx={{ fontSize: 40 }} component={SearchIcon} /> 
    },
    { 
      value: 'Looking for a specific item', 
      label: 'Looking for a specific item', 
      icon: <Box sx={{ fontSize: 40 }} component={ShoppingCartIcon} /> 
    },
    { 
      value: 'Interior furnishing consultation', 
      label: 'Interior furnishing consultation', 
      icon: <Box sx={{ fontSize: 40 }} component={DesignServicesIcon} /> 
    },
    { 
      value: 'Urgent purchase', 
      label: 'Urgent purchase', 
      icon: <Box sx={{ fontSize: 40 }} component={PriorityHighIcon} /> 
    },
    { 
      value: 'Delivery inquiry', 
      label: 'Delivery inquiry', 
      icon: <Box sx={{ fontSize: 40 }} component={LocalShippingIcon} /> 
    },
  ];

  const handleSelect = (value: string) => {
    formik.setFieldValue('purposeOfVisit', value);
    setTimeout(() => onNext(), 300); // Slight delay for better UX
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Purpose of Your Visit
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            What brings you to Leema Furniture today?
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, mb: 4 }}>
            {purposes.map((purpose) => (
              <Box sx={{ gridColumn: 'span 6' }} key={purpose.value}>
                <Paper
                  elevation={formik.values.purposeOfVisit === purpose.value ? 6 : 1}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: formik.values.purposeOfVisit === purpose.value ? 2 : 0,
                    borderColor: 'primary.main',
                    backgroundColor: formik.values.purposeOfVisit === purpose.value 
                      ? 'rgba(139, 90, 43, 0.1)' 
                      : 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 90, 43, 0.05)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleSelect(purpose.value)}
                >
                  <Box sx={{ mb: 2 }}>
                    {purpose.icon}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{purpose.label}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={onBack}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Back
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onNext}
              disabled={!formik.values.purposeOfVisit}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Next
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PurposeStep;
