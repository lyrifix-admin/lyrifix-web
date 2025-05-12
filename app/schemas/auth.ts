import { z } from "zod";

const fullName = z.string();

const email = z.string().email();

const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be at most 32 characters long" })
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

export const RegisterSchema = z.object({ fullName, email, password });

export const LoginSchema = z.object({ email, password });
