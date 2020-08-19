import express from "express";
import { validateWarehouse, validateStock, handleValidate } from './../validator';
import {
    list,
    create,
    stocks,
    restock,
    unstocks,
    remove
} from "../controllers/warehouseController";

const router = express.Router();

router.get('/', list);
router.post('/', validateWarehouse, handleValidate, create);
router.get('/:warehouseId/stocks/:productId', stocks);
router.post('/:warehouseId/stocks/:productId', restock);
router.post('/:warehouseId/unstocks/:productId', validateStock, handleValidate, unstocks);
router.delete('/:id', remove);

export default router;