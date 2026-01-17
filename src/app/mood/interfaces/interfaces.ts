export interface MoodSong {
  name: string;
  artist: string;
  played_at: string;
  emotion: string;
  emotion_group: string;
  emotion_value: number;
}

export interface Mood {
  songs: MoodSong[];
}