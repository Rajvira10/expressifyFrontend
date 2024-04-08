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
  topics: Topic[] | null;
};

export type Topic = {
  id: number;
  title: string;
  description: string;
  courses: Course[] | null;
  assignments: Assignment[] | null;
  learning_materials: LearningMaterial[] | null;
};

export type Assignment = {
  id: number;
  title: string;
  description: string;
  //   topic: Topic | null;
  assignment_metrics: AssignmentMetric[] | null;
};

export type AssignmentMetric = {
  id: number;
  title: string;
  //   assignment: Assignment | null;
};

export type LearningMaterial = {
  id: number;
  title: string;
  description: string;
  link: string;
  type: "Video" | "Document";
  //   topic: Topic | null;
};

export type Learner = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  mentors: Mentor[] | null;
};

export type Mentor = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  learners: Learner[] | null;
};
