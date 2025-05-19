import { z } from "zod";

const username = z.string();
const fullName = z.string();
const email = z.string().email();

export const UserSchema = z.object({ username, fullName, email });

export type User = z.infer<typeof UserSchema>;
