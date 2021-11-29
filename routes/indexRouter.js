import express from "express";
import brandRouter from "./brandRouter.js";
import sportgoodRouter from "./sportgoodRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/sportgood", sportgoodRouter);

export default router;
