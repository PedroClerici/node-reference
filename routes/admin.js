import { Router } from "express";

import * as adminController from "../controllers/admin.js";

const router = Router();

router.post("/product", adminController.postProduct);
router.put("/product", adminController.putProduct);
router.delete("/product", adminController.deleteProduct);
router.get("/add-product", adminController.getAddProduct);
router.get("/edit-product/:id", adminController.getEditProduct);
router.get("/products", adminController.getProducts);

export default router;
