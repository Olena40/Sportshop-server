import express from "express";
import brandRouter from "./brandRouter.js";
import sportgoodRouter from "./sportgoodRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import postRouter from "./postRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/sportgood", sportgoodRouter);
router.use("/category", categoryRouter);
router.use("/post", postRouter);

export default router;
