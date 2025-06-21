import pool from "../config/database.js";

const createCustomerTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY DEFAULT (
        LOWER(
          SUBSTRING(CAST(FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000) AS TEXT) || 
          LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0')
          FROM 3)
        )
      ),
    name VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    preferredContactMethod VARCHAR(100) NOT NULL,
    purposeOfVisit VARCHAR(100) NOT NULL,
    interestedCategories JSONB NOT NULL, 
    deliveryLocation VARCHAR(255) DEFAULT '',
    branchId VARCHAR(50) DEFAULT 'main-branch',
    timestamp BIGINT
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
