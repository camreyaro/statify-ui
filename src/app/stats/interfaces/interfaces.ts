export interface Track {
  id: string;
  name: string;
  artist: string;
  album_image_url: string | null;
}

export interface Artist {
  name: string;
  image_url: string | null;
}

export interface ArtistTopTracks {
  name: string;
  tracks: Track[];
}

export type TopTracksByArtist = Record<string, ArtistTopTracks>;
