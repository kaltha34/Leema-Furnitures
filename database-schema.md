# Leema Furniture POS - Database Schema

## Firebase Firestore Collection: `customers`

This collection stores all customer information collected through the POS kiosk interface.

### Document Structure

| Field                  | Type                | Description                                           | Required |
|------------------------|---------------------|-------------------------------------------------------|----------|
| name                   | String              | Customer's name                                       | No       |
| phoneNumber            | String              | Customer's phone number (Sri Lankan format)           | Yes      |
| preferredContactMethod | String (enum)       | Customer's preferred contact method                   | Yes      |
| purposeOfVisit         | String (enum)       | Customer's purpose for visiting the store             | Yes      |
| interestedCategories   | Array of Strings    | Product categories the customer is interested in      | Yes      |
| deliveryLocation       | String              | City or area for furniture delivery                   | No       |
| timestamp              | Timestamp           | When the form was submitted                           | Yes      |
| branchId               | String              | ID of the branch where the form was submitted         | Yes      |

### Enum Values

**preferredContactMethod**:
- WhatsApp
- SMS
- Call
- No Contact

**purposeOfVisit**:
- Just browsing
- Looking for a specific item
- Interior furnishing consultation
- Urgent purchase
- Delivery inquiry

**interestedCategories** (multiple selection allowed):
- Sofas
- Beds
- Dining Sets
- Office Furniture
- Wardrobes / Storage
- Outdoor Furniture
- Others

## Indexes

For optimal query performance, create the following indexes:

1. `timestamp` (DESC) + `branchId` - For listing submissions by time at each branch
2. `interestedCategories` + `timestamp` (DESC) - For analyzing interest in specific categories over time
3. `purposeOfVisit` + `branchId` + `timestamp` (DESC) - For analyzing visit purposes by branch

## Sample Document

```json
{
  "name": "John Perera",
  "phoneNumber": "+94771234567",
  "preferredContactMethod": "WhatsApp",
  "purposeOfVisit": "Interior furnishing consultation",
  "interestedCategories": ["Sofas", "Dining Sets"],
  "deliveryLocation": "Colombo",
  "timestamp": "2025-06-13T12:30:45Z",
  "branchId": "main-branch"
}
```

## Admin Dashboard Queries

The following queries will be used in the future admin dashboard:

1. Get all submissions from a specific branch within a date range
2. Count submissions by product category interest
3. Analyze preferred contact methods
4. Track visit purposes over time
5. Identify peak submission times/days
