import { z } from "zod";

const id = z.string();
const username = z.string();
const fullName = z.string();
const email = z.string().email();

export const UserSchema = z.object({ id, username, fullName, email });

export type User = z.infer<typeof UserSchema>;
