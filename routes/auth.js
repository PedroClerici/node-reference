import { Router } from "express";

import * as authController from "../controllers/auth.js";

const router = Router();

router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/login", authController.getLogin);

export default router;
