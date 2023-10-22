import { NextFunction, Request, Response } from "express";
import UserModels from "../models/User.models";
import { configureOpenAI } from "../config/openai.config";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message } = req.body;

  try {
    const user = await UserModels.findById(res.locals.jwtData.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const chats = (await user.chats.map(({ role, content }) => ({
      role,
      content,
    }))) as ChatCompletionMessageParam[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const openai = configureOpenAI();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push({ role: "bot", content: chatResponse.choices[0].message });
    await user.save();

    return res
      .status(200)
      .json({ message: chatResponse.choices[0].message, chats: user.chats });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
