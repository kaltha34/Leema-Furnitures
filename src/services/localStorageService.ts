// Local Storage Service for Leema Furniture POS
// This service replaces Firebase with browser localStorage and optional JSON Server integration

import axios from "axios"

// Types from the original Firebase service
export type ContactMethod = 'WhatsApp' | 'SMS' | 'Call' | 'No Contact';
export type VisitPurpose = 'Just browsing' | 'Looking for a specific item' | 'Interior furnishing consultation' | 'Urgent purchase' | 'Delivery inquiry';

// Define ProductCategory as an interface
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

// For backwards compatibility
export type ProductCategoryType = 'Sofas' | 'Beds' | 'Dining Sets' | 'Office Furniture' | 'Wardrobes / Storage' | 'Outdoor Furniture' | 'Others';

export interface CustomerData {
  id?: string;
  name?: string;
  phoneNumber: string;
  preferredContactMethod: ContactMethod;
  purposeOfVisit: VisitPurpose;
  interestedCategories: ProductCategory[];
  deliveryLocation?: string;
  branchId?: string; // Make branchId optional
  timestamp?: number;
}

const API_BASE_URL = 'http://localhost:5000/api'

// Generate a unique ID for each customer entry
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Save customer data to localStorage
export const saveCustomerData = async (data: CustomerData) => {
  try {
    console.log('Saving customer data:', data);
    
    // Validate required fields
    if (!data.phoneNumber) {
      throw new Error('Phone number is required');
    }
    
    if (!data.preferredContactMethod) {
      throw new Error('Preferred contact method is required');
    }
    
    if (!data.purposeOfVisit) {
      throw new Error('Purpose of visit is required');
    }
    
    if (!data.interestedCategories || data.interestedCategories.length === 0) {
      throw new Error('At least one interested category is required');
    }
    
    // Add timestamp and ensure branchId
    const customerData = {
      ...data,
      timestamp: Date.now(),
      branchId: data.branchId || 'main-branch'
    };
    
    // Get existing data
    // let existingData: Record<string, CustomerData> = {};
    // try {
    //   const existingDataString = localStorage.getItem('leema_customers');
    //   if (existingDataString) {
    //     existingData = JSON.parse(existingDataString);
    //     console.log('Existing data loaded successfully');
    //   } else {
    //     console.log('No existing data found, creating new storage');
    //   }
    // } catch (parseError) {
    //   console.error('Error parsing existing data, creating new storage:', parseError);
    //   // Continue with empty object if parsing fails
    // }
    
    // // Generate ID and add new customer
    // const id = generateId();
    // existingData[id] = customerData;
    
    // // Save back to localStorage
    // try {
    //   localStorage.setItem('leema_customers', JSON.stringify(existingData));
    //   console.log('Data saved to localStorage successfully');
    // } catch (storageError) {
    //   console.error('Error saving to localStorage:', storageError);
    //   throw new Error('Failed to save to localStorage. Storage may be full or unavailable.');
    // }
    
    // Optional: Send to a backend server if available
    try {
      // This could be replaced with a real API endpoint
      const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
    } catch (error) {
      console.warn('Could not sync with backend server:', error);
      // Continue anyway since we saved to localStorage
    }
    
  } catch (error) {
    console.error('Error saving customer data:', error);
    throw error; // Rethrow the original error for better debugging
  }
};

// Get all customer data
export const getAllCustomers = async (): Promise<Record<string, CustomerData>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data || {};
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Get customer by ID
// export const getCustomerById = (id: string): CustomerData | null => {
//   const allCustomers = getAllCustomers();
//   return allCustomers[id] || null;
// };

// Delete customer
export const deleteCustomer = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/customers/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting customer ${id}:`, error);
    throw error;
  }
};

// Export all customers to JSON
export const exportCustomersToJson = async (): Promise<string> => {
  try {
    // Get all customers from the API
    const customers = await getAllCustomers();
    
    // Convert to JSON string with pretty formatting
    const jsonData = JSON.stringify(customers, null, 2);
    
    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create and return a URL for the blob
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error exporting customers to JSON:', error);
    throw error;
  }
};

// Export all customers to CSV format for Excel
export const exportCustomersToCSV = async (): Promise<string> => {
  try {
    // Get all customers from the API
    const customers = await getAllCustomers();
    
    // Add BOM for Excel to recognize UTF-8
    let csvContent = '\ufeff';
    
    // Define CSV headers
    csvContent += 'Customer ID,Name,Phone Number,Preferred Contact Method,Purpose of Visit,Interested Categories,Delivery Location,Branch ID,Timestamp\r\n';
    
    // Add each customer as a row
    Object.entries(customers).forEach(([id, customer]) => {
      // Format the categories as a semicolon-separated list
      const categories = customer.interestedCategories
        .map(cat => cat.name)
        .join('; ');
      
      // Format the timestamp as a readable date
      const date = customer.timestamp ? new Date(customer.timestamp).toISOString() : '';
      
      // Escape fields that might contain commas or special characters
      const escapeCsvField = (field: string | undefined) => {
        if (!field) return '';
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
          return `"${field.replace(/"/g, '""')}"`; // Escape quotes with double quotes
        }
        return field;
      };
      
      // Create the CSV row
      const row = [
        escapeCsvField(id),
        escapeCsvField(customer.name),
        escapeCsvField(customer.phoneNumber),
        escapeCsvField(customer.preferredContactMethod),
        escapeCsvField(customer.purposeOfVisit),
        escapeCsvField(categories),
        escapeCsvField(customer.deliveryLocation),
        escapeCsvField(customer.branchId),
        escapeCsvField(date)
      ].join(',');
      
      csvContent += row + '\r\n'; // Use Windows-style line endings for Excel
    });
    
    // Create a blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create and return a URL for the blob
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error exporting customers to CSV:', error);
    throw error;
  }
};;

// Initialize the service
// export const initializeStorageService = (): void => {
//   // Check if localStorage is available
//   try {
//     localStorage.setItem('leema_test', 'test');
//     localStorage.removeItem('leema_test');
//     console.log('Local storage service initialized successfully');
//   } catch (error) {
//     console.error('Local storage is not available:', error);
//   }
// };

// // Initialize the service when imported
// // Call the function immediately to ensure localStorage is available
// initializeStorageService();
