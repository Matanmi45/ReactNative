import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3, "Invalid name!"),
  email: z.string().trim().email("Invalid email address!"),
  password: z.string().min(5, "Password must be 5 chars long!"),
});

export const signinSchema = z.object({
  email: z.string().trim().email("Invalid email address!"),
  password: z.string(),
});
