import * as Yup from 'yup';

// Validation schema for the customer form
export const customerFormValidationSchema = Yup.object({
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
    .of(Yup.string().oneOf([
      'Sofas',
      'Beds',
      'Dining Sets',
      'Office Furniture',
      'Wardrobes / Storage',
      'Outdoor Furniture',
      'Others'
    ], 'Invalid category'))
    .min(1, 'Please select at least one category'),
  
  deliveryLocation: Yup.string()
    .max(100, 'Location should be 100 characters or less'),
});

// Initial values for the form
export const initialFormValues = {
  name: '',
  phoneNumber: '',
  preferredContactMethod: '',
  purposeOfVisit: '',
  interestedCategories: [],
  deliveryLocation: '',
};

// Sri Lankan cities for autocomplete
export const sriLankanCities = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Negombo',
  'Trincomalee',
  'Batticaloa',
  'Anuradhapura',
  'Ratnapura',
  'Badulla',
  'Matara',
  'Kurunegala',
  'Gampaha',
  'Kalutara',
  'Kegalle',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Matale',
  'Hambantota',
  'Monaragala',
  'Puttalam',
  'Vavuniya',
  'Kilinochchi',
  'Mannar',
  'Mullaitivu',
  'Ampara'
];
