import { MD3Theme } from "react-native-paper";

// Defining the type for the SelectedExercise component
export interface SelectedExerciseProps {
  name: string;
  order: number;
  information: string;
  imageURL: string;
  onRemove: (order: number) => void;
  theme: MD3Theme;
}
