import { z } from "zod";

const envSchema = z.object({
  BACKEND_API_URL: z
    .string()
    .url({ message: "BACKEND_API_URL must be a valid URL" }),
});

const parsedEnv = envSchema.safeParse({
  BACKEND_API_URL: process.env.BACKEND_API_URL,
});

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const BACKEND_API_URL = parsedEnv.data.BACKEND_API_URL;
