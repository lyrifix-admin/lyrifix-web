import { type Artist } from "../artist/type";
import { type Lyric } from "../lyric/type";
export type Song = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  artists: Artist[];
  lyrics: Lyric[];
  createdAt: Date;
  updatedAt: Date;
};

export type Songs = Song[];

export type SongsResponse = {
  songs: Song[];
};
