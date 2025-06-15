import pool from "../config/database";

  // Get all furnitures
  export const getAllFurnituresService = async() => {
    try {
      const result = await pool.query(
        "SELECT * FROM furnitures ORDER BY id ASC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new furniture
  export const createFurnitureService = async (furnitureData) => {
    const { name, phone, contat_method, purpose, category, date } =
      furnitureData;
    try {
      const result = await pool.query(
        "INSERT INTO furnitures (name, phone, contat_method, purpose, category, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, phone, contat_method, purpose, category, date]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  export const deleteFurnitureService = async(id) => {
    try {
      const result = await pool.query(
        "DELETE FROM furnitures WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
