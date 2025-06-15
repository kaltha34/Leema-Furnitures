import express from "express";
import {
  getAllCustomers,
  createNewCustomer,
  deleteCustomer,
} from "../controllers/customersController.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.post("/", createNewCustomer);
router.delete("/:id", deleteCustomer);

export default router;
