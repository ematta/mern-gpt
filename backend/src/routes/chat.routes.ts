import e, { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import { generateChatCompletion } from "../controllers/chat.controllers";

const chatRouter = Router();

chatRouter.use(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion,
);

export default chatRouter;
