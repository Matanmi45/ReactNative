import { Router } from "express";
import {
  newUserSchema,
  resetPassSchema,
  verifyTokenSchema,
} from "../utils/validationSchema";
import {
  createNewUser,
  generateForgetPassLink,
  generateVerificationLink,
  grantAccessToken,
  grantValid,
  sendProfile,
  sendPublicProfile,
  signIn,
  signOut,
  updateAvatar,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "../controllers/auth";
import { isAuth, isValidPassResetToken } from "../middleware/auth";
import validate from "../middleware/validator";
import fileParser from "../middleware/fileParser";

const authRouter = Router();

authRouter.post("/sign-up", validate(newUserSchema), createNewUser);
authRouter.post("/verify", validate(verifyTokenSchema), verifyEmail);
authRouter.get("/verify-token", isAuth, generateVerificationLink);
authRouter.post("/sign-in", signIn);
authRouter.get("/profile", isAuth, sendProfile);
authRouter.post("/refresh-token", grantAccessToken);
authRouter.post("/sign-out", isAuth, signOut);
authRouter.post("/forget-pass", generateForgetPassLink);
authRouter.post(
  "/verify-pass-reset-token",
  validate(verifyTokenSchema),
  isValidPassResetToken,
  grantValid
);
authRouter.post(
  "/reset-pass",
  validate(resetPassSchema),
  isValidPassResetToken,
  updatePassword
);
authRouter.patch("/update-profile", isAuth, updateProfile);
authRouter.patch("/update-avatar", isAuth, fileParser, updateAvatar);
authRouter.get("/profile/:id", isAuth, sendPublicProfile);
export default authRouter;
