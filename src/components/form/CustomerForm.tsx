import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';

// Form steps
import WelcomeStep from './WelcomeStep';
import PersonalInfoStep from './PersonalInfoStep';
import ContactMethodStep from './ContactMethodStep';
import PurposeStep from './PurposeStep';
import CategoryStep from './CategoryStep';
import DeliveryLocationStep from './DeliveryLocationStep';
import ThankYouStep from './ThankYouStep';

// Components
import ProgressBar from '../layout/ProgressBar';

// Utils
import { customerFormValidationSchema, initialFormValues } from '../../utils/validation';
import { saveCustomerData } from '../../services/firebase';

const CustomerForm: React.FC = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const totalSteps = 6; // Excluding welcome and thank you screens
  
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: customerFormValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Add branch ID (this would be configured per kiosk)
        const dataToSubmit = {
          ...values,
          branchId: 'main-branch', // This would be configured per kiosk
          // Ensure correct typing for the contact method
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
    setCurrentStep(currentStep + 1);
    
    // If we're at the last step, submit the form
    if (currentStep === totalSteps) {
      formik.handleSubmit();
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

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />;
      case 1:
        return <PersonalInfoStep formik={formik} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ContactMethodStep formik={formik} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PurposeStep formik={formik} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <CategoryStep formik={formik} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <DeliveryLocationStep formik={formik} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <ThankYouStep isSubmitting={isSubmitting} submitSuccess={submitSuccess} onReset={handleReset} />;
      default:
        return <WelcomeStep onNext={handleNext} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="md">
        {currentStep > 0 && currentStep < totalSteps + 1 && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )}
        
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default CustomerForm;
