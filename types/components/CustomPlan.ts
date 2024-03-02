import { MD3Theme } from "react-native-paper";

export interface CustomPlanData {
  id: number;
  title: string;
  information: string;
  difficulty: number;
}

export interface CustomPlanProps {
  id: number;
  title: string;
  information: string;
  difficulty: number;
  theme: MD3Theme
}

export interface CustomPlanListProps {
  data: CustomPlanData[];
  theme: MD3Theme;
}
