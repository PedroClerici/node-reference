import path from "node:path";
import { Router } from "express";

import * as adminController from "../controllers/admin.js";

const router = Router();

router.post("/add-product", adminController.postAddProducts);
router.get("/add-product", adminController.getAddProducts);
router.get("/products", adminController.getProducts);

export default router;
