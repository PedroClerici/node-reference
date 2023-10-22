import path from "node:path";
import { Router } from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/orders", shopController.getOrders);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);

export default router;
