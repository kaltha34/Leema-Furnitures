import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper } from '@mui/material';
import { FormikProps } from 'formik';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import CallIcon from '@mui/icons-material/Call';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

interface ContactMethodStepProps {
  formik: FormikProps<any>;
  onNext: () => void;
  onBack: () => void;
}

const ContactMethodStep: React.FC<ContactMethodStepProps> = ({ formik, onNext, onBack }) => {
  const contactMethods = [
    { value: 'WhatsApp', label: 'WhatsApp', icon: <Box sx={{ fontSize: 40 }} component={WhatsAppIcon} /> },
    { value: 'SMS', label: 'SMS', icon: <Box sx={{ fontSize: 40 }} component={SmsIcon} /> },
    { value: 'Call', label: 'Call', icon: <Box sx={{ fontSize: 40 }} component={CallIcon} /> },
    { value: 'No Contact', label: 'No Contact', icon: <Box sx={{ fontSize: 40 }} component={DoNotDisturbIcon} /> },
  ];

  const handleSelect = (value: string) => {
    formik.setFieldValue('preferredContactMethod', value);
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
            Preferred Contact Method
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            How would you like us to contact you?
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
            {contactMethods.map((method) => (
              <Box sx={{ gridColumn: 'span 6' }} key={method.value}>
                <Paper
                  elevation={formik.values.preferredContactMethod === method.value ? 6 : 1}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: formik.values.preferredContactMethod === method.value ? 2 : 0,
                    borderColor: 'primary.main',
                    backgroundColor: formik.values.preferredContactMethod === method.value 
                      ? 'rgba(139, 90, 43, 0.1)' 
                      : 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 90, 43, 0.05)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleSelect(method.value)}
                >
                  <Box sx={{ mb: 2 }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h6">{method.label}</Typography>
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
              disabled={!formik.values.preferredContactMethod}
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

export default ContactMethodStep;
