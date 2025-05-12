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

export type Song = z.infer<typeof SongSchema>;
export type Songs = z.infer<typeof SongsSchema>;
