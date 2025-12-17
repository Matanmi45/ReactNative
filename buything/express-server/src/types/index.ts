import { signinSchema, signupSchema } from "@/validator";
import { RequestHandler } from "express";
import { z } from "zod";

type SignUpHandlerBody = z.infer<typeof signupSchema>;
type SignInHandlerBody = z.infer<typeof signinSchema>;

export type SignUpHandler = RequestHandler<{}, {}, SignUpHandlerBody>;
export type SignInHandler = RequestHandler<{}, {}, SignInHandlerBody>;
