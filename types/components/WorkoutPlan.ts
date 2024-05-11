import { MD3Theme } from "react-native-paper";

export interface WorkoutPlanProps {
  id: string;
  title: string;
  information: number;
  difficulty: number;
  theme: MD3Theme
}