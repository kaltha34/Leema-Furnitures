import React from 'react';
import { Box, Typography, Button, Card, CardContent, Paper, Checkbox, Grid } from '@mui/material';
import { FormikProps } from 'formik';
import { motion } from 'framer-motion';
import WeekendIcon from '@mui/icons-material/Weekend';
import BedIcon from '@mui/icons-material/Bed';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ChairIcon from '@mui/icons-material/Chair';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DeckIcon from '@mui/icons-material/Deck';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface CategoryStepProps {
  formik: FormikProps<any>;
  onNext: () => void;
  onBack: () => void;
}

const CategoryStep: React.FC<CategoryStepProps> = ({ formik, onNext, onBack }) => {
  const categories = [
    { value: 'Sofas', label: 'Sofas', icon: <Box sx={{ fontSize: 40 }} component={WeekendIcon} /> },
    { value: 'Beds', label: 'Beds', icon: <Box sx={{ fontSize: 40 }} component={BedIcon} /> },
    { value: 'Dining Sets', label: 'Dining Sets', icon: <Box sx={{ fontSize: 40 }} component={TableRestaurantIcon} /> },
    { value: 'Office Furniture', label: 'Office Furniture', icon: <Box sx={{ fontSize: 40 }} component={ChairIcon} /> },
    { value: 'Wardrobes / Storage', label: 'Wardrobes / Storage', icon: <Box sx={{ fontSize: 40 }} component={KitchenIcon} /> },
    { value: 'Outdoor Furniture', label: 'Outdoor Furniture', icon: <Box sx={{ fontSize: 40 }} component={DeckIcon} /> },
    { value: 'Others', label: 'Others', icon: <Box sx={{ fontSize: 40 }} component={MoreHorizIcon} /> },
  ];

  const handleToggleCategory = (value: string) => {
    const currentCategories = [...formik.values.interestedCategories];
    const index = currentCategories.indexOf(value);
    
    if (index === -1) {
      currentCategories.push(value);
    } else {
      currentCategories.splice(index, 1);
    }
    
    formik.setFieldValue('interestedCategories', currentCategories);
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
            Interested Product Categories
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Select all categories you're interested in (select at least one)
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, mb: 4 }}>
              {categories.map((category) => {
                const isSelected = formik.values.interestedCategories.includes(category.value);
                
                return (
                  <Box sx={{ gridColumn: { xs: 'span 6', sm: 'span 4' } }} key={category.value}>
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
                        backgroundColor: isSelected ? 'rgba(139, 90, 43, 0.1)' : 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 90, 43, 0.05)',
                        },
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onClick={() => handleToggleCategory(category.value)}
                    >
                      <Checkbox
                        checked={isSelected}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          '& .MuiSvgIcon-root': { fontSize: 28 }
                        }}
                        onChange={() => {}}
                      />
                      <Box sx={{ mb: 2 }}>
                        {category.icon}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{category.label}</Typography>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          </Box>
          
          {formik.touched.interestedCategories && formik.errors.interestedCategories && (
            <Typography color="error" sx={{ mt: 2 }}>
              {formik.errors.interestedCategories as string}
            </Typography>
          )}
          
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
              onClick={() => {
                formik.validateField('interestedCategories').then(() => {
                  if (!formik.errors.interestedCategories) {
                    onNext();
                  }
                });
              }}
              disabled={formik.values.interestedCategories.length === 0}
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

export default CategoryStep;
