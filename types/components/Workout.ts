export type WorkoutType = {
  id: number;
  title: string;
  information: string;
  difficulty: 1 | 2 | 3;
  bannerURL: string;
  height?: number;
};
