import express from "express";
import { validateWarehouse, validateStock, handleValidate } from './../validator';
import {
    list,
    get,
    create,
    update,
    stocks,
    restock,
    unstocks,
    remove
} from "../controllers/warehouseController";

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', validateWarehouse, handleValidate, create);
router.put('/:id', validateWarehouse, handleValidate, update);
router.get('/:warehouseId/stocks/:productId', stocks);
router.post('/:warehouseId/stocks/:productId', restock);
router.post('/:warehouseId/unstocks/:productId', validateStock, handleValidate, unstocks);
router.delete('/:id', remove);

export default router;