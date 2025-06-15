import pool from "../config/database.js";

const createFurnitureTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS furnitures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(10) NOT NULL,
    contact_method VARCHAR(20),
    purpose VARCHAR(20),
    category VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    `;

  try {
    pool.query(queryText);
    console.log("Furniture table created if not exists");
  } catch (error) {
    console.log("Error creating user", error);
  }
};

export default createFurnitureTable;
