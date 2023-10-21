import path from "node:path";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "shop.html"));
});

export default router;
