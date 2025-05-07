import { z } from "zod";
import { LyricSchema } from "../lyric/schema";
import { ArtistSchema } from "../artist/schema";

export const SongSchema = z.object({
  id: z.string().ulid(),
  slug: z.string(),
  title: z.string(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  artists: z.array(ArtistSchema),
  lyrics: z.array(LyricSchema),
});

export const SongsSchema = z.array(SongSchema);
