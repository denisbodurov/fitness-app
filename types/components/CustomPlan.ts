import { MD3Theme } from "react-native-paper";

export interface CustomPlanType {
  id: number;
  title: string;
  information: string;
  difficulty: 1 | 2 | 3;
  theme: MD3Theme
}
