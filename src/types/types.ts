export type Category = {
  id: number;
  title: string;
  description: string;
  learning_tracks: LearningTrack[] | null;
};

export type LearningTrack = {
  id: number;
  title: string;
  description: string;
  categories: Category[] | null;
  learning_tracks: LearningTrack[] | null;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  learning_tracks: LearningTrack[] | null;
};