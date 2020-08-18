import express from "express";
import warehouseController from "../controllers/warehouseController";

const router = express.Router();

router.get('/', warehouseController.list);
router.post('/', warehouseController.create);
router.get('/:warehouseId/stocks/:productId', warehouseController.stocks);
router.post('/:warehouseId/unstocks/:productId', warehouseController.unstocks);
router.delete('/:id', warehouseController.remove);

export default router;