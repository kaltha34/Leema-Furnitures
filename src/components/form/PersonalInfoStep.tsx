import React from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { FormikProps } from 'formik';
import { motion } from 'framer-motion';

interface PersonalInfoStepProps {
  formik: FormikProps<any>;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formik, onNext, onBack }) => {
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
            Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Please provide your contact details so we can assist you better.
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
              <Box sx={{ gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Your Name (optional)"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name ? String(formik.errors.name) : undefined}
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '12px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                />
              </Box>
              
              <Box sx={{ gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Mobile Number"
                  variant="outlined"
                  placeholder="07X-XXXXXXX or +94 7X-XXXXXXX"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? String(formik.errors.phoneNumber) : undefined}
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '12px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
                onClick={() => {
                  formik.validateField('phoneNumber').then(() => {
                    if (!formik.errors.phoneNumber) {
                      onNext();
                    }
                  });
                }}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoStep;
