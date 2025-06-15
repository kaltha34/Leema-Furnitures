import pool from "../config/database.js";

const createCustomerTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    customerId VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    preferredContactMethod VARCHAR(100) NOT NULL,
    purposeOfVisit VARCHAR(100) NOT NULL,
    interestedCategories JSONB NOT NULL, 
    deliveryLocation VARCHAR(255) DEFAULT '',
    branchId VARCHAR(50) DEFAULT 'main-branch',
    timestamp VARCHAR(100)
)
    `;

  try {
    pool.query(queryText);
    console.log("Customers table created if not exists");
  } catch (error) {
    console.log("Error creating user", error);
  }
};

export default createCustomerTable;
