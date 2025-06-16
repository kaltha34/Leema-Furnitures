import pool from "../config/database.js";

// Get all customer
export const getAllCustomerService = async () => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Create new customer
export const createCustomerService = async (customerData) => {
  const {
    name,
    phoneNumber,
    preferredContactMethod,
    purposeOfVisit,
    interestedCategories,
    deliveryLocation,
    branchId,
    timestamp,
  } = customerData;
  try {
    const result = await pool.query(
      "INSERT INTO customers (name, phoneNumber, preferredContactMethod, purposeOfVisit, interestedCategories, deliveryLocation, branchId, timestamp ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        phoneNumber,
        preferredContactMethod,
        purposeOfVisit,
        JSON.stringify(interestedCategories),
        deliveryLocation,
        branchId,
        timestamp
      ]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Delete customer
export const deleteCustomerService = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
