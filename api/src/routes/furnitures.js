import express from "express"
import furnitureController from "../controllers/furnituresController"

const router = express.Router();

router.get('/', furnitureController.getFurnitures);
router.post('/', furnitureController.createFurniture);
router.delete('/:id', furnitureController.deleteFurniture);

export default router;
