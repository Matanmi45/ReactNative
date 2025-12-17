import {
  registerNewUser,
  sendProfileInfo,
  signInUsers,
  updateProfileImage,
} from "@/controllers/auth";
import { isAuth } from "@/middlewares/auth";
import { validate } from "@/validator";
import { signinSchema, signupSchema } from "@/validator/schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", validate(signupSchema), registerNewUser);
authRouter.post("/sign-in", validate(signinSchema), signInUsers);
authRouter.get("/is-auth", isAuth, sendProfileInfo);
authRouter.post("/profile-image", isAuth, updateProfileImage);

export default authRouter;
