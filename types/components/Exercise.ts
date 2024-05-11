import { MD3Theme } from "react-native-paper";

// Defining the type for the Exercise component
export interface ExerciseProps {
  name: string;
  order: number;
  information: string;
  imageURL: string;
  onRemove: (order: number) => void;
  theme: MD3Theme;
}
