import { MD3Theme } from "react-native-paper";

export interface ProgressData {
  workouts: number;
  calories: number;
  minutes: number;
}

export interface ProgressProps {
  data: ProgressData;
  theme: MD3Theme
}

export interface DataBlockProps {
  value: number;
  suffix: string;
  theme: MD3Theme;
};
