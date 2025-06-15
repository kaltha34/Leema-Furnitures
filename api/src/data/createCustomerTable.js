import pool from "../config/database.js";

const createCustomerTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    contact_method VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    delivery_location VARCHAR(255) DEFAULT NULL,
    branch VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
