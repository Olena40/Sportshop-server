import express from "express";
import { create, getAll, destroy } from "../controllers/typeController.js";
import { checkRole } from "../middleware/checkRoleMiddleware.js";

const router = express.Router();

router.post("/", create);
// router.post("/", checkRole("ADMIN"), create);
router.get("/", getAll);
router.delete("/", destroy);

export default router;
