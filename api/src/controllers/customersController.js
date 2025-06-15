import {
  getAllCustomerService,
  createCustomerService,
  deleteCustomerService,
} from "../models/furnitureService.js";

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomerService();
    res.status(200).json({
      status: 200,
      message: "customers retrieved successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving customers",
      error: error.message,
    });
  }
};

// Create new customer
export const createNewCustomer = async (req, res) => {
  try {
    const { name, phone, contact_method, purpose, category, delivery_location, branch } = req.body;

    // Validation
    if (!phone || !name || !contact_method || !purpose || !category) {
      return res.status(400).json({
        status: 400,
        message: "Required fields are missing",
      });
    }

    const newCustomer = await createCustomerService({
      name,
      phone,
      contact_method,
      purpose,
      category,
      delivery_location, 
      branch
    });

    res.status(201).json({
      status: 201,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating furniture",
      error: error.message,
    });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await deleteCustomerService(id);

    if (!deletedCustomer) {
      return res.status(404).json({
        status: 404,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Customer deleted successfully",
      data: deletedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error deleting Customer",
      error: error.message,
    });
  }
};
