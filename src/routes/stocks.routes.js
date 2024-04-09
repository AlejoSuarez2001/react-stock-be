import { Router } from "express";
import { getStock, getStocks } from "../Controllers/stocks.controller.js";

const router = Router();

router.get("/stocks", getStocks);
router.get("/stock/:symbol", getStock);

export default router;
