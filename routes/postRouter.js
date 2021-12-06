import express from "express";

const router = express.Router();

import { create, getAll, getOne } from "../controllers/postController.js";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);

export default router;
