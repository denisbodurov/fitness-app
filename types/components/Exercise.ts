import { MD3Theme } from "react-native-paper";

export interface ExerciseProps {
  name: string;
  order: number;
  information: string;
  imageURL: string;
  onRemove: (order: number) => void;
  theme: MD3Theme;
}
