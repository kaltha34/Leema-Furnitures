import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  Typography, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Checkbox, 
  FormGroup, 
  Autocomplete,
  CircularProgress,
  Container
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveCustomerData } from '../../services/firebase';
import { sriLankanCities } from '../../utils/validation';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Name should be 50 characters or less'),
  
  phoneNumber: Yup.string()
    .matches(
      /^(?:\+94|0)[1-9][0-9]{8}$/,
      'Please enter a valid Sri Lankan phone number'
    )
    .required('Phone number is required'),
  
  preferredContactMethod: Yup.string()
    .oneOf(['WhatsApp', 'SMS', 'Call', 'No Contact'], 'Invalid contact method')
    .required('Please select a preferred contact method'),
  
  purposeOfVisit: Yup.string()
    .oneOf([
      'Just browsing',
      'Looking for a specific item',
      'Interior furnishing consultation',
      'Urgent purchase',
      'Delivery inquiry'
    ], 'Invalid purpose of visit')
    .required('Please select your purpose of visit'),
  
  interestedCategories: Yup.array()
    .min(1, 'Please select at least one category')
    .required('Please select at least one category'),
  
  deliveryLocation: Yup.string()
    .max(100, 'Location should be 100 characters or less'),
});

// Initial values
const initialValues = {
  name: '',
  phoneNumber: '',
  preferredContactMethod: '',
  purposeOfVisit: '',
  interestedCategories: [] as string[],
  deliveryLocation: '',
};

// Product categories
const productCategories = [
  { value: 'Sofas', label: 'Sofas' },
  { value: 'Beds', label: 'Beds' },
  { value: 'Dining Sets', label: 'Dining Sets' },
  { value: 'Office Furniture', label: 'Office Furniture' },
  { value: 'Wardrobes / Storage', label: 'Wardrobes / Storage' },
  { value: 'Outdoor Furniture', label: 'Outdoor Furniture' },
  { value: 'Others', label: 'Others' },
];

// Visit purposes
const visitPurposes = [
  { value: 'Just browsing', label: 'Just browsing' },
  { value: 'Looking for a specific item', label: 'Looking for a specific item' },
  { value: 'Interior furnishing consultation', label: 'Interior furnishing consultation' },
  { value: 'Urgent purchase', label: 'Urgent purchase' },
  { value: 'Delivery inquiry', label: 'Delivery inquiry' },
];

// Contact methods
const contactMethods = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'SMS', label: 'SMS' },
  { value: 'Call', label: 'Call' },
  { value: 'No Contact', label: 'No Contact' },
];

const SimpleCustomerForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const totalSteps = 5;
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Add branch ID (this would be configured per kiosk)
        const dataToSubmit = {
          ...values,
          branchId: 'main-branch', // This would be configured per kiosk
          preferredContactMethod: values.preferredContactMethod as 'WhatsApp' | 'SMS' | 'Call' | 'No Contact',
          purposeOfVisit: values.purposeOfVisit as 'Just browsing' | 'Looking for a specific item' | 'Interior furnishing consultation' | 'Urgent purchase' | 'Delivery inquiry'
        };
        
        await saveCustomerData(dataToSubmit);
        setSubmitSuccess(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = () => {
    if (currentStep === totalSteps) {
      formik.handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    formik.resetForm();
    setCurrentStep(0);
    setSubmitSuccess(false);
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = [...formik.values.interestedCategories];
    const index = currentCategories.indexOf(category);
    
    if (index === -1) {
      currentCategories.push(category);
    } else {
      currentCategories.splice(index, 1);
    }
    
    formik.setFieldValue('interestedCategories', currentCategories);
  };

  // Progress calculation
  const progress = ((currentStep) / totalSteps) * 100;

  // Render welcome screen
  if (currentStep === 0) {
    return (
      <Container maxWidth="md">
        <Card 
          sx={{ 
            maxWidth: '100%', 
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 4,
            mt: 4
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
              onClick={() => setCurrentStep(1)}
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
      </Container>
    );
  }

  // Render thank you screen
  if (currentStep === totalSteps + 1) {
    return (
      <Container maxWidth="md">
        <Card 
          sx={{ 
            maxWidth: '100%', 
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 4,
            mt: 4
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
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                  Thank You for Visiting Us!
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, mb: 6 }}>
                  Our team will assist you shortly.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={handleReset}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Start Over
                </Button>
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
                  onClick={handleReset}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Try Again
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Progress Bar */}
      <Box sx={{ width: '100%', mb: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Step {currentStep} of {totalSteps}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 5, p: 0.5 }}>
          <Box
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'primary.main',
              width: `${progress}%`,
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </Box>
      </Box>

      <Card sx={{ p: 3, mb: 4 }}>
        <CardContent>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Your Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Please provide your contact details so we can assist you better.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
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
                  helperText={formik.touched.name && formik.errors.name as string}
                  sx={{ mb: 3 }}
                  inputProps={{ style: { fontSize: '1.2rem', padding: '12px' } }}
                />
                
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
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber as string}
                  inputProps={{ style: { fontSize: '1.2rem', padding: '12px' } }}
                />
              </Box>
            </Box>
          )}

          {/* Step 2: Contact Method */}
          {currentStep === 2 && (
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Preferred Contact Method
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                How would you like us to contact you?
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  name="preferredContactMethod"
                  value={formik.values.preferredContactMethod}
                  onChange={formik.handleChange}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {contactMethods.map((method) => (
                      <Card 
                        key={method.value}
                        sx={{ 
                          width: 'calc(50% - 8px)', 
                          p: 2,
                          cursor: 'pointer',
                          border: formik.values.preferredContactMethod === method.value ? 2 : 0,
                          borderColor: 'primary.main',
                          backgroundColor: formik.values.preferredContactMethod === method.value 
                            ? 'rgba(139, 90, 43, 0.1)' 
                            : 'white',
                        }}
                        onClick={() => formik.setFieldValue('preferredContactMethod', method.value)}
                      >
                        <FormControlLabel
                          value={method.value}
                          control={<Radio />}
                          label={method.label}
                          sx={{ width: '100%', m: 0 }}
                        />
                      </Card>
                    ))}
                  </Box>
                </RadioGroup>
                {formik.touched.preferredContactMethod && formik.errors.preferredContactMethod && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.preferredContactMethod as string}
                  </Typography>
                )}
              </FormControl>
            </Box>
          )}

          {/* Step 3: Purpose of Visit */}
          {currentStep === 3 && (
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Purpose of Your Visit
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                What brings you to Leema Furniture today?
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  name="purposeOfVisit"
                  value={formik.values.purposeOfVisit}
                  onChange={formik.handleChange}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {visitPurposes.map((purpose) => (
                      <Card 
                        key={purpose.value}
                        sx={{ 
                          width: 'calc(50% - 8px)', 
                          p: 2,
                          cursor: 'pointer',
                          border: formik.values.purposeOfVisit === purpose.value ? 2 : 0,
                          borderColor: 'primary.main',
                          backgroundColor: formik.values.purposeOfVisit === purpose.value 
                            ? 'rgba(139, 90, 43, 0.1)' 
                            : 'white',
                        }}
                        onClick={() => formik.setFieldValue('purposeOfVisit', purpose.value)}
                      >
                        <FormControlLabel
                          value={purpose.value}
                          control={<Radio />}
                          label={purpose.label}
                          sx={{ width: '100%', m: 0 }}
                        />
                      </Card>
                    ))}
                  </Box>
                </RadioGroup>
                {formik.touched.purposeOfVisit && formik.errors.purposeOfVisit && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.purposeOfVisit as string}
                  </Typography>
                )}
              </FormControl>
            </Box>
          )}

          {/* Step 4: Product Categories */}
          {currentStep === 4 && (
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Interested Product Categories
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Select all categories you're interested in (select at least one)
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormGroup>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {productCategories.map((category) => {
                      const isSelected = formik.values.interestedCategories.includes(category.value);
                      
                      return (
                        <Card 
                          key={category.value}
                          sx={{ 
                            width: 'calc(50% - 8px)', 
                            p: 2,
                            cursor: 'pointer',
                            border: isSelected ? 2 : 0,
                            borderColor: 'primary.main',
                            backgroundColor: isSelected 
                              ? 'rgba(139, 90, 43, 0.1)' 
                              : 'white',
                          }}
                          onClick={() => handleCategoryToggle(category.value)}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={isSelected}
                                onChange={() => handleCategoryToggle(category.value)}
                                name={category.value}
                              />
                            }
                            label={category.label}
                            sx={{ width: '100%', m: 0 }}
                          />
                        </Card>
                      );
                    })}
                  </Box>
                </FormGroup>
                {formik.touched.interestedCategories && formik.errors.interestedCategories && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {formik.errors.interestedCategories as string}
                  </Typography>
                )}
              </FormControl>
            </Box>
          )}

          {/* Step 5: Delivery Location */}
          {currentStep === 5 && (
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Delivery Location
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Where would you like your furniture delivered? (Optional)
              </Typography>
              
              <Autocomplete
                id="deliveryLocation"
                options={sriLankanCities}
                fullWidth
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
                    error={formik.touched.deliveryLocation && Boolean(formik.errors.deliveryLocation)}
                    helperText={formik.touched.deliveryLocation && formik.errors.deliveryLocation as string}
                  />
                )}
              />
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {currentStep > 1 ? (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleBack}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Back
              </Button>
            ) : (
              <Box />
            )}
            
            <Box>
              {currentStep === 5 && (
                <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={() => {
                    formik.setFieldValue('deliveryLocation', '');
                    handleNext();
                  }}
                  sx={{ px: 2, py: 1.5, fontSize: '1.1rem', mr: 2 }}
                >
                  Skip
                </Button>
              )}
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formik.values.phoneNumber) ||
                  (currentStep === 2 && !formik.values.preferredContactMethod) ||
                  (currentStep === 3 && !formik.values.purposeOfVisit) ||
                  (currentStep === 4 && formik.values.interestedCategories.length === 0)
                }
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                {currentStep === totalSteps ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SimpleCustomerForm;
