import express from "express";
import productController from "./../controller/productController";

const router = express.Router();

router.get('/', productController.list);
router.post('/', productController.create);
router.delete('/:id', productController.remove);

export default router;