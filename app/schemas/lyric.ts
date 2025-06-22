import { z } from "zod";

export const LyricSchema = z.object({
  id: z.string(),
  slug: z.string(),
  songId: z.string(),
  text: z.string(),
  upvoteCount: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const LyricsSchema = z.array(LyricSchema);

export const CreateLyricSchema = LyricSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateLyricSchema = LyricSchema.pick({
  id: true,
  text: true,
});

export const UpvoteSchema = z.object({
  id: z.string().min(1, "Required"),
});

export const CreateLyricschema = z.array(CreateLyricSchema);
export const UpdateLyricschema = z.array(UpdateLyricSchema);

export type Lyric = z.infer<typeof LyricSchema>;
export type Lyrics = z.infer<typeof LyricsSchema>;
