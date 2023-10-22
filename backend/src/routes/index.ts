import { Router } from "express";
import userRouter from "./user.routes";
import chatRouter from "./chat.routes";

const router = Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);

export default router;
