import express from "express";
import { create, getAll } from "../controllers/typeController.js";
import { checkRole } from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post("/", create);
router.post("/", checkRole("ADMIN"), create);
router.get("/", getAll);

export default router;
