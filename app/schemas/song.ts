import { z } from "zod";
import { ArtistSchema } from "./artist";
import { LyricSchema } from "./lyric";

export const SongSchema = z.object({
  id: z.string().ulid(),
  slug: z.string(),
  title: z.string(),
  imageUrl: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  artists: z.array(ArtistSchema),
  lyrics: z.array(LyricSchema),
});

export const SongsSchema = z.array(SongSchema);

export const CreateSongSchema = z.object({
  imageUrl: z.string().min(1).optional(),
  title: z.string().min(1),
  artistIds: z.array(z.string().min(1)),
  userId: z.string().ulid().optional(),
  spotifyUrl: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? val : null)),
});

export const UpdateSongSchema = z.object({
  id: z.string().ulid(),
  imageUrl: z.string().min(1).optional(),
  title: z.string().min(1),
  artistIds: z.array(z.string().min(1)),
  spotifyUrl: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
});

export type Song = z.infer<typeof SongSchema>;
export type Songs = z.infer<typeof SongsSchema>;
