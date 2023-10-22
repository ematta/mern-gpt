import {
  NextFunction,
  Request,
  Response
}
  from "express";
import { hash, compare } from "bcrypt";
import UserModels from "../models/User.models";
import { createToken } from "../utils/token-manager";
import { COOKIE_NAME } from "../utils/constants";

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

    res.clearCookie(COOKIE_NAME), {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    };

    const token = createToken(existingUser._id.toString(), existingUser.email);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    })

    res.status(201).json({
      message: "User created successfully",
      name: user.name,
      email: user.email
    });
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

    res.clearCookie(COOKIE_NAME), {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    };

    const token = createToken(existingUser._id.toString(), existingUser.email);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    })

    return res.status(200).json({
      message: "Login successful",
      name: existingUser.name,
      email: existingUser.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
}


export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await UserModels.findById(res.locals.jwtData.id);
    if (!existingUser) return res.status(400).json({ message: "User already exists" });
    if(existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "User verified",
      name: existingUser.name,
      email: existingUser.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}
