import express from "express";

const router = express.Router();

import { create, getAll } from "../controllers/categoryController.js";

router.post("/", create);
router.get("/", getAll);

export default router;
