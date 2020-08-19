import express from "express";
import { validateProduct, handleValidate } from './../validator';
import { list, get, create, update, remove } from "./../controllers/productController";

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', validateProduct, handleValidate, create);
router.put('/:id', validateProduct, handleValidate, update);
router.delete('/:id', remove);

export default router;