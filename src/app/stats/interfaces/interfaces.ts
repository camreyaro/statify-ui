export interface Track {
  name: string;
  artist: string;
  album_image_url: string | null;
}

export interface Artist {
  name: string;
  image_url: string | null;
}

export type TopTracksByArtist = Record<string, Track[]>;
