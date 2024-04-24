import { MD3Theme } from "react-native-paper";

export interface WorkoutData {
  id: number;
  url: string;
  title: string;
  information: string;
  difficulty: number;
}

export interface WorkoutProps {
  id: number;
  title: string;
  information: string;
  difficulty: number;
  bannerURL: string;
  containerHeight?: number;
  theme: MD3Theme
};



export interface WorkoutListProps {
  data: WorkoutData[];
  theme: MD3Theme;
}
