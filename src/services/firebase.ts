import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration
// Replace with your actual Firebase config when deploying
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "leema-furniture-pos.firebaseapp.com",
  projectId: "leema-furniture-pos",
  storageBucket: "leema-furniture-pos.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Customer data interface
export interface CustomerData {
  name?: string;
  phoneNumber: string;
  preferredContactMethod: 'WhatsApp' | 'SMS' | 'Call' | 'No Contact';
  purposeOfVisit: 'Just browsing' | 'Looking for a specific item' | 'Interior furnishing consultation' | 'Urgent purchase' | 'Delivery inquiry';
  interestedCategories: string[];
  deliveryLocation?: string;
  timestamp: any;
  branchId: string;
}

// Save customer data to Firestore
export const saveCustomerData = async (data: Omit<CustomerData, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), {
      ...data,
      timestamp: Timestamp.now()
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export default db;
