export type Song = {
    id: string;
    slug: string;
    title: string;
    imageUrl: string;
    artist: string;
    lyric: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Songs = Song[];