import { Router } from "express";
import { getAllUsers, userSignup, userLogin } from "../controllers/user.controllers";
import { loginValidator, signupValidator, validate } from "../utils/validators";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);

export default userRouter;