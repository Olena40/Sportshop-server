import express from "express";
import { author } from "../middleware/authMiddleware.js";

const router = express.Router();

import { registration, login, check } from "../controllers/userController.js";

router.post("/registration", registration);
router.post("/login", login);
router.get("/auth", author, check);

export default router;
