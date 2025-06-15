import {
  createFurnitureService,
  getAllFurnituresService,
  deleteFurnitureService,
} from "../models/furnitureService.js";

// Get all furnitures
export const getAllFurnitures = async (req, res) => {
  try {
    const furnitures = await getAllFurnituresService();
    res.status(200).json({
      status: 200,
      message: "furnitures retrieved successfully",
      data: furnitures,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving furnitures",
      error: error.message,
    });
  }
};

// Create new furniture
export const createFurniture = async (req, res) => {
  try {
    const { name, phone, contat_method, purpose, category } = req.body;

    // Validation
    if (!phone) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }

    const newFurniture = await createFurnitureService({
      name,
      phone,
      contat_method,
      purpose,
      category,
    });

    res.status(201).json({
      status: 201,
      message: "Furniture created successfully",
      data: newFurniture,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating furniture",
      error: error.message,
    });
  }
};

// Delete furniture
export const deleteFurniture = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFurniture = await deleteFurnitureService(id);

    if (!deletedFurniture) {
      return res.status(404).json({
        status: 404,
        message: "Furniture not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Furniture deleted successfully",
      data: deletedFurniture,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error deleting Furniture",
      error: error.message,
    });
  }
};
