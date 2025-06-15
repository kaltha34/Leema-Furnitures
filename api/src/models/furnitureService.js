import pool from "../config/database.js";

  // Get all customer
  export const getAllCustomerService = async() => {
    try {
      const result = await pool.query(
        "SELECT * FROM customers ORDER BY id ASC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new customer
  export const createCustomerService = async (furnitureData) => {
    const { name, phone, contact_method, purpose, category, delivery_location, branch} =
      furnitureData;
    try {
      const result = await pool.query(
        "INSERT INTO customers (name, phone, contact_method, purpose, category, delivery_location, branch ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, phone, contact_method, purpose, category,delivery_location, branch]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete customer
  export const deleteCustomerService = async(id) => {
    try {
      const result = await pool.query(
        "DELETE FROM customers WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
