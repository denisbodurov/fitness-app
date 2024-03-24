import { MD3Theme } from "react-native-paper";

export interface WorkoutData {
  id: number;
  type: "arms" | "abs" | "legs";
  title: string;
  information: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface WorkoutProps {
  id: number;
  title: string;
  information: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  bannerURL: string;
  containerHeight?: number;
  theme: MD3Theme
};



export interface WorkoutListProps {
  data: WorkoutData[];
  theme: MD3Theme;
}
