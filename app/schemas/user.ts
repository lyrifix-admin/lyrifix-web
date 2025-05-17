import { z } from "zod";

const name = z.string();
const email = z.string().email();

export const UserSchema = z.object({ name, email });

export type User = z.infer<typeof UserSchema>;
