import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Welcome to my shop!</h1>");
});

export default router;
