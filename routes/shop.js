import { Router } from "express";

import * as shopController from "../controllers/shop.js";

const router = Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:id", shopController.getProductById);
router.get("/orders", shopController.getOrders);
router.post("/cart", shopController.postCart);
router.get("/cart", shopController.getCart);
router.delete("/cart", shopController.deleteCart);
// router.get("/checkout", shopController.getCheckout);
router.post("/order", shopController.postOrder);

export default router;
