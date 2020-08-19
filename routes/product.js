import express from "express";
import { validateProduct, handleValidate } from './../validator';
import { list, create, remove } from "./../controllers/productController";

const router = express.Router();

router.get('/', list);
router.post('/', validateProduct, handleValidate, create);
router.delete('/:id', remove);

export default router;