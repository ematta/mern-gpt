import {
  NextFunction,
  Request,
  Response
}
  from "express";
import { hash, compare } from "bcrypt";
import UserModels from "../models/User.models";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModels.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModels.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashPassword = await hash(password, 10);
    const user = await UserModels.create({
      name,
      email,
      password: hashPassword
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModels.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not registered" });

    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid credentials" });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
}