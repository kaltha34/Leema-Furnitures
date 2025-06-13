import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, Autocomplete } from '@mui/material';
import { FormikProps } from 'formik';
import { motion } from 'framer-motion';
import { sriLankanCities } from '../../utils/validation';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface DeliveryLocationStepProps {
  formik: FormikProps<any>;
  onNext: () => void;
  onBack: () => void;
}

const DeliveryLocationStep: React.FC<DeliveryLocationStepProps> = ({ formik, onNext, onBack }) => {
  const [open, setOpen] = useState(false);

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
            Delivery Location
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Where would you like your furniture delivered? (Optional)
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
            <LocationOnIcon sx={{ mt: 2, mr: 2, color: 'primary.main' }} />
            <Autocomplete
              id="deliveryLocation"
              options={sriLankanCities}
              fullWidth
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              freeSolo
              value={formik.values.deliveryLocation}
              onChange={(_, newValue) => {
                formik.setFieldValue('deliveryLocation', newValue || '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City or Area for delivery"
                  variant="outlined"
                  onChange={(e) => {
                    formik.setFieldValue('deliveryLocation', e.target.value);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: { fontSize: '1.2rem', padding: '12px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                />
              )}
            />
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
            
            <Box>
              <Button
                variant="text"
                color="primary"
                size="large"
                onClick={() => {
                  formik.setFieldValue('deliveryLocation', '');
                  onNext();
                }}
                sx={{ px: 2, py: 1.5, fontSize: '1.1rem', mr: 2 }}
              >
                Skip
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onNext}
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

export default DeliveryLocationStep;
