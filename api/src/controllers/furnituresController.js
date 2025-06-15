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
      success: true,
      data: furnitures,
      message: "furnitures retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: "Required fielsd are missing",
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
      success: true,
      data: newFurniture,
      message: "Furniture created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: "Furniture not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedFurniture,
      message: "Furniture deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Furniture",
      error: error.message,
    });
  }
};
