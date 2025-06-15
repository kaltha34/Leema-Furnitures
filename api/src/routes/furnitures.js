import express from "express";
import {
  getAllFurnitures,
  createFurniture,
  deleteFurniture,
} from "../controllers/furnituresController";

const router = express.Router();

router.get("/", getAllFurnitures);
router.post("/", createFurniture);
router.delete("/:id", deleteFurniture);

export default router;
