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
  imageUrl: z.string().min(1), // TODO: upload image
  title: z.string().min(1),
  artist: z.string().min(1), // TODO: artistsId?
  lyric: z.string().min(1), // TODO: lyric
});

export type Song = z.infer<typeof SongSchema>;
export type Songs = z.infer<typeof SongsSchema>;
