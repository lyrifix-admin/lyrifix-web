import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" })
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#_]/,
      "Password must contain at least one special character",
    ),
});

export const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true,
});
