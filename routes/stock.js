import express from "express";
import stockController from "./../controller/stockController";

const router = express.Router();

router.get('/stock', stockController.list);
router.post('/unstock', stockController.removeAll);

export default router;