import React, { useState, useEffect } from 'react';
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
  Container,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Snackbar,
  Alert,
  Backdrop
} from '@mui/material';
import { motion, Easing } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveCustomerData } from '../../services/localStorageService';
import { ProductCategory, ContactMethod, VisitPurpose } from '../../services/localStorageService';

// Import icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import CallIcon from '@mui/icons-material/Call';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WeekendIcon from '@mui/icons-material/Weekend';
import BedIcon from '@mui/icons-material/Bed';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ChairIcon from '@mui/icons-material/Chair';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DeckIcon from '@mui/icons-material/Deck';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^[0-9]{10}$/,
      'Please enter a valid 10-digit phone number'
    ),
  preferredContactMethod: Yup.string().required('Please select a contact method') as any,
  purposeOfVisit: Yup.string().required('Please select a purpose') as any,
  interestedCategories: Yup.array().min(1, 'Please select at least one category'),
  deliveryLocation: Yup.string(),
});

// Initial values
const initialValues = {
  name: '',
  phoneNumber: '',
  preferredContactMethod: '',
  purposeOfVisit: '',
  interestedCategories: [] as ProductCategory[],
  deliveryLocation: '',
};

// Contact method options
const contactMethods = [
  { value: 'WhatsApp' as ContactMethod, label: 'WhatsApp', icon: <Box sx={{ fontSize: 32, color: '#25D366' }} component={WhatsAppIcon} /> },
  { value: 'SMS' as ContactMethod, label: 'SMS', icon: <Box sx={{ fontSize: 32, color: '#2196F3' }} component={SmsIcon} /> },
  { value: 'Call' as ContactMethod, label: 'Phone Call', icon: <Box sx={{ fontSize: 32, color: '#4CAF50' }} component={CallIcon} /> },
  { value: 'No Contact' as ContactMethod, label: 'No Contact', icon: <Box sx={{ fontSize: 32, color: '#757575' }} component={DoNotDisturbIcon} /> },
];

// Purpose of visit options
const purposes = [
  { 
    value: 'Just browsing' as VisitPurpose, 
    label: 'Just Browsing', 
    description: 'Looking around to see what\'s available',
    icon: <Box sx={{ fontSize: 32 }} component={SearchIcon} />
  },
  { 
    value: 'Looking for a specific item' as VisitPurpose, 
    label: 'Specific Item', 
    description: 'I know what I want to purchase',
    icon: <Box sx={{ fontSize: 32 }} component={ShoppingCartIcon} />
  },
  { 
    value: 'Interior furnishing consultation' as VisitPurpose, 
    label: 'Interior Consultation', 
    description: 'Need help designing my space',
    icon: <Box sx={{ fontSize: 32 }} component={DesignServicesIcon} />
  },
  { 
    value: 'Urgent purchase' as VisitPurpose, 
    label: 'Urgent Purchase', 
    description: 'Need something right away',
    icon: <Box sx={{ fontSize: 32 }} component={ShoppingCartIcon} />
  },
  { 
    value: 'Delivery inquiry' as VisitPurpose, 
    label: 'Delivery Inquiry', 
    description: 'Questions about shipping and delivery',
    icon: <Box sx={{ fontSize: 32 }} component={LocalShippingIcon} />
  },
];

// Product categories - directly using ProductCategory objects
const categoryData: ProductCategory[] = [
  { id: 'Sofas', name: 'Sofas', description: 'Comfortable seating for your living room' },
  { id: 'Chairs', name: 'Chairs', description: 'Ergonomic chairs for your workspace' },
  { id: 'Tables', name: 'Tables', description: 'Dining tables for your home' },
  { id: 'Beds', name: 'Beds', description: 'Comfortable beds for a good night sleep' },
  { id: 'Storage', name: 'Storage', description: 'Storage solutions for your home' },
  { id: 'Outdoor', name: 'Outdoor', description: 'Furniture for your garden or patio' },
  { id: 'Others', name: 'Others', description: 'Other furniture items' },
];

// Category UI mapping
const categories = [
  { value: categoryData[0], label: 'Sofas', icon: <Box sx={{ fontSize: 32 }} component={WeekendIcon} /> },
  { value: categoryData[1], label: 'Chairs', icon: <Box sx={{ fontSize: 32 }} component={ChairIcon} /> },
  { value: categoryData[2], label: 'Tables', icon: <Box sx={{ fontSize: 32 }} component={TableRestaurantIcon} /> },
  { value: categoryData[3], label: 'Beds', icon: <Box sx={{ fontSize: 32 }} component={BedIcon} /> },
  { value: categoryData[4], label: 'Storage', icon: <Box sx={{ fontSize: 32 }} component={KitchenIcon} /> },
  { value: categoryData[5], label: 'Outdoor', icon: <Box sx={{ fontSize: 32 }} component={DeckIcon} /> },
  { value: categoryData[6], label: 'Others', icon: <Box sx={{ fontSize: 32 }} component={MoreHorizIcon} /> },
];

// Part 1 of the PremiumCustomerForm component
const PremiumCustomerForm: React.FC = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  
  const totalSteps = 5;
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        console.log('Form values before submission:', values);
        
        // The categories are already of ProductCategory type
        const typedCategories: ProductCategory[] = values.interestedCategories;
        console.log('Categories before submission:', typedCategories);
        
        // Save to local storage with correct types
        const data = {
          branchId: 'main-branch',
          name: values.name,
          preferredContactMethod: values.preferredContactMethod as ContactMethod,
          purposeOfVisit: values.purposeOfVisit as VisitPurpose,
          phoneNumber: values.phoneNumber,
          interestedCategories: typedCategories,
          deliveryLocation: values.deliveryLocation,
        };
        
        console.log('Data to be saved:', data);
        
        // Ensure localStorage is initialized
        if (typeof localStorage === 'undefined') {
          throw new Error('localStorage is not available');
        }
        
        const customerId = await saveCustomerData(data);
        console.log('Customer data saved with ID:', customerId);
        
        // Advance to success screen
        setCurrentStep(totalSteps + 1);
        setSubmitSuccess(true);
        setSnackbarMessage('Information saved successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        
        // Reset form after delay
        setTimeout(() => {
          formik.resetForm();
          setCurrentStep(0);
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitSuccess(false);
        setSnackbarMessage('Failed to save information. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = () => {
    // The form has 5 steps (0-indexed, so 0-4)
    console.log('Current step:', currentStep, 'Total steps:', totalSteps);
    
    if (currentStep < totalSteps - 1) {
      // Move to next step if not on final step
      setCurrentStep(currentStep + 1);
      console.log('Moving to next step:', currentStep + 1);
    } else {
      // On the final step, trigger form submission
      console.log('On final step, submitting form');
      // Force validation before submission
      formik.validateForm().then(errors => {
        console.log('Validation errors:', errors);
        if (Object.keys(errors).length === 0) {
          // No validation errors, submit the form
          formik.submitForm();
        } else {
          console.log('Form has validation errors, cannot submit');
          // Show validation errors
          setSnackbarMessage('Please fill all required fields');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      });
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

  const handleCategoryToggle = (category: ProductCategory) => {
    console.log('Toggling category:', category);
    console.log('Current categories before toggle:', formik.values.interestedCategories);
    
    const currentCategories = [...formik.values.interestedCategories];
    const index = currentCategories.findIndex(item => item.id === category.id);
    console.log('Found index:', index);
    
    if (index === -1) {
      console.log('Adding category:', category);
      currentCategories.push(category);
    } else {
      console.log('Removing category at index:', index);
      currentCategories.splice(index, 1);
    }
    
    console.log('Categories after toggle:', currentCategories);
    formik.setFieldValue('interestedCategories', currentCategories);
  };

  // Progress calculation
  const progress = ((currentStep) / totalSteps) * 100;

  // Define animation variants
  const pageVariants = {
    initial: { opacity: 0, x: '-100vw' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100vw' }
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'easeInOut' as Easing,
    duration: 0.5
  };

  // Render welcome screen
  if (currentStep === 0) {
    return (
      <Container maxWidth="md">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Card 
            sx={{ 
              maxWidth: '100%', 
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 4,
              mt: 4,
              borderRadius: 4,
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            <CardContent sx={{ width: '100%' }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ 
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}>
                  Welcome to Leema Furniture
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, mb: 6, color: 'text.secondary' }}>
                  Discover your perfect furniture pieces with us today
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
                  borderRadius: '50px',
                  boxShadow: '0 4px 20px rgba(139, 90, 43, 0.4)',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 25px rgba(139, 90, 43, 0.5)',
                  }
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Start
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  // Render thank you screen
  if (currentStep === totalSteps + 1) {
    return (
      <Container maxWidth="md">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Card 
            sx={{ 
              maxWidth: '100%', 
              minHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 4,
              mt: 4,
              borderRadius: 4,
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            <CardContent>
              {isSubmitting ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CircularProgress size={100} thickness={5} sx={{ mb: 4, color: theme.palette.primary.main }} />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Submitting your information...
                  </Typography>
                </Box>
              ) : submitSuccess ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 120, color: 'success.main', mb: 4 }} />
                  </motion.div>
                  
                  <Typography variant="h3" component="h1" gutterBottom sx={{ 
                    fontWeight: 700,
                    background: `linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Thank You for Visiting Us!
                  </Typography>
                  
                  <Typography variant="h5" sx={{ mt: 2, mb: 6, color: 'text.secondary' }}>
                    Our team will assist you shortly.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large" 
                      onClick={handleReset}
                      startIcon={<RestartAltIcon />}
                      sx={{ 
                        py: 1.5, 
                        px: 4,
                        borderRadius: '50px',
                        boxShadow: '0 4px 20px rgba(139, 90, 43, 0.4)',
                      }}
                    >
                      Start Over
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="large" 
                      onClick={() => {
                        // Export functionality would go here
                        setSnackbarMessage('Data export feature will be available in the next update');
                        setSnackbarSeverity('info');
                        setSnackbarOpen(true);
                      }}
                      startIcon={<CloudDownloadIcon />}
                      sx={{ 
                        py: 1.5, 
                        px: 4,
                        borderRadius: '50px'
                      }}
                    >
                      Export Data
                    </Button>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mt: 4, opacity: 0.7 }}>
                    This screen will reset in a few seconds...
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h3" component="h1" color="error" gutterBottom sx={{ fontWeight: 600 }}>
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
        </motion.div>
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
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 5, p: 0.5, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box
            sx={{
              height: 10,
              borderRadius: 5,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              width: `${progress}%`,
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </Box>
      </Box>

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        key={currentStep}
      >
        <Card sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }
        }}>
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
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
                    helperText={formik.touched.name && formik.errors.name ? String(formik.errors.name) : undefined}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        }
                      }
                    }}
                    InputProps={{
                      style: { fontSize: '1.1rem', padding: '14px' }
                    }}
                    InputLabelProps={{
                      style: { fontSize: '1.1rem' }
                    }}
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
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? String(formik.errors.phoneNumber) : undefined}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        }
                      }
                    }}
                    InputProps={{
                      style: { fontSize: '1.1rem', padding: '14px' }
                    }}
                    InputLabelProps={{
                      style: { fontSize: '1.1rem' }
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Step 2: Contact Method */}
            {currentStep === 2 && (
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Preferred Contact Method
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  How would you like us to contact you?
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
                    {contactMethods.map((method) => {
                      const isSelected = formik.values.preferredContactMethod === method.value;
                      return (
                        <Box sx={{ gridColumn: { xs: 'span 6', sm: 'span 3' } }} key={method.value}>
                          <Paper
                            elevation={isSelected ? 6 : 1}
                            sx={{
                              p: 3,
                              textAlign: 'center',
                              cursor: 'pointer',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: isSelected ? 2 : 0,
                              borderColor: 'primary.main',
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : 'white',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                transform: 'translateY(-4px)',
                                boxShadow: isSelected ? 6 : 3,
                              },
                              transition: 'all 0.3s ease',
                              borderRadius: 4
                            }}
                            onClick={() => formik.setFieldValue('preferredContactMethod', method.value)}
                          >
                            <Box sx={{ 
                              mb: 2, 
                              p: 1.5, 
                              borderRadius: '50%', 
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                              transition: 'all 0.3s ease'
                            }}>
                              {method.icon}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>{method.label}</Typography>
                          </Paper>
                        </Box>
                      );
                    })}
                  </Box>
                  {formik.touched.preferredContactMethod && formik.errors.preferredContactMethod && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {String(formik.errors.preferredContactMethod)}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            )}

            {/* Step 3: Purpose of Visit */}
            {currentStep === 3 && (
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Purpose of Your Visit
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  What brings you to Leema Furniture today?
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
                    {purposes.map((purpose) => {
                      const isSelected = formik.values.purposeOfVisit === purpose.value;
                      return (
                        <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }} key={purpose.value}>
                          <Paper
                            elevation={isSelected ? 6 : 1}
                            sx={{
                              p: 3,
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              border: isSelected ? 2 : 0,
                              borderColor: 'primary.main',
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : 'white',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                transform: 'translateY(-2px)',
                                boxShadow: isSelected ? 6 : 3,
                              },
                              transition: 'all 0.3s ease',
                              borderRadius: 4
                            }}
                            onClick={() => formik.setFieldValue('purposeOfVisit', purpose.value)}
                          >
                            <Box sx={{ 
                              mr: 2, 
                              p: 1.5, 
                              borderRadius: '50%', 
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.grey[200], 0.7),
                              color: isSelected ? 'primary.main' : 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}>
                              {purpose.icon}
                            </Box>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 500 }}>{purpose.label}</Typography>
                              <Typography variant="body2" color="text.secondary">{purpose.description}</Typography>
                            </Box>
                          </Paper>
                        </Box>
                      );
                    })}
                  </Box>
                  {formik.touched.purposeOfVisit && formik.errors.purposeOfVisit && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {String(formik.errors.purposeOfVisit)}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            )}

            {/* Step 4: Categories */}
            {currentStep === 4 && (
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Product Categories
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  Which products are you interested in? (Select all that apply)
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mb: 4 }}>
                    {categories.map((category) => {
                      const isSelected = formik.values.interestedCategories.some(item => item.id === category.value.id);
                      return (
                        <Box sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 3' } }} key={category.value.id}>
                          <Paper
                            elevation={isSelected ? 6 : 1}
                            sx={{
                              p: 3,
                              textAlign: 'center',
                              cursor: 'pointer',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: isSelected ? 2 : 0,
                              borderColor: 'primary.main',
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : 'white',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                transform: 'translateY(-4px)',
                                boxShadow: isSelected ? 6 : 3,
                              },
                              transition: 'all 0.3s ease',
                              borderRadius: 4
                            }}
                            onClick={() => {
                              console.log('Clicked category:', category.value);
                              const currentCategories = [...formik.values.interestedCategories];
                              const index = currentCategories.findIndex(item => item.id === category.value.id);
                              
                              if (index === -1) {
                                console.log('Adding category directly');
                                currentCategories.push(category.value);
                              } else {
                                console.log('Removing category directly');
                                currentCategories.splice(index, 1);
                              }
                              
                              console.log('Updated categories:', currentCategories);
                              formik.setFieldValue('interestedCategories', currentCategories);
                              
                              // Force validation update after category selection
                              formik.validateField('interestedCategories');
                              
                              // Debug validation state
                              setTimeout(() => {
                                console.log('Form errors after category selection:', formik.errors);
                                console.log('Form touched after category selection:', formik.touched);
                                console.log('Category validation:', formik.errors.interestedCategories);
                              }, 100);
                            }}
                          >
                            <Box sx={{ 
                              mb: 2, 
                              p: 1.5, 
                              borderRadius: '50%', 
                              backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.grey[200], 0.7),
                              color: isSelected ? 'primary.main' : 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}>
                              {category.icon}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>{category.label}</Typography>
                          </Paper>
                        </Box>
                      );
                    })}
                  </Box>
                  {formik.touched.interestedCategories && formik.errors.interestedCategories && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {String(formik.errors.interestedCategories)}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            )}

            {/* Step 5: Delivery Location */}
            {currentStep === 5 && (
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Delivery Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                  If you're considering delivery, where would the items be delivered? (Optional)
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="deliveryLocation"
                    name="deliveryLocation"
                    label="Delivery Address"
                    variant="outlined"
                    placeholder="Enter your delivery address or area"
                    value={formik.values.deliveryLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.deliveryLocation && Boolean(formik.errors.deliveryLocation)}
                    helperText={
                      (formik.touched.deliveryLocation && formik.errors.deliveryLocation) 
                        ? String(formik.errors.deliveryLocation) 
                        : "This information helps us provide accurate delivery estimates"
                    }
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        }
                      }
                    }}
                    InputProps={{
                      style: { fontSize: '1.1rem' }
                    }}
                    InputLabelProps={{
                      style: { fontSize: '1.1rem' }
                    }}
                  />
                </Box>
                
                <Box sx={{ 
                  p: 3, 
                  mt: 2, 
                  borderRadius: 2, 
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <HelpOutlineIcon color="info" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="info.main">
                      Why we ask
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Knowing your location helps us calculate delivery times and costs. We'll also check if your area is within our delivery radius.
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Navigation */}
      {submitSuccess && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentStep(0)}
            sx={{ mr: 2 }}
          >
            Start New Form
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component="a"
            href="/admin"
            sx={{ ml: 2 }}
          >
            View Customer Data
          </Button>
        </Box>
      )}

      {/* Form Navigation */}
      {!submitSuccess && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        {currentStep > 1 ? (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              borderRadius: '50px',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
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
              startIcon={<SkipNextIcon />}
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
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              borderRadius: '50px',
              boxShadow: '0 4px 20px rgba(139, 90, 43, 0.4)',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(139, 90, 43, 0.5)',
              },
              '&.Mui-disabled': {
                background: theme.palette.action.disabledBackground,
                boxShadow: 'none'
              }
            }}
          >
            {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PremiumCustomerForm;
