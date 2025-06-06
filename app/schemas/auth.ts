import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 carachter" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .regex(/\W/, {
      message: "Password must contain at least one special character",
    })
    .refine((val) => !/\s/.test(val), {
      message: "Password must not contain spaces",
    }),
});

export const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true,
});
