import { z } from "zod";

export const LyricSchema = z.object({
  id: z.string(),

  slug: z.string(),
  songId: z.string(),
  text: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const LyricsSchema = z.array(LyricSchema);

export const CreateLyricSchema = LyricSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateLyricschema = z.array(CreateLyricSchema);
