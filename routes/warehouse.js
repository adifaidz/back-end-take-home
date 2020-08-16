import express from "express";
import warehouseController from "./../controller/warehouseController";

const router = express.Router();

router.get('/', warehouseController.list);
router.post('/', warehouseController.create);
router.delete('/:id', warehouseController.remove);

export default router;