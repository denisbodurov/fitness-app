import { MD3Theme } from "react-native-paper";
import { ExerciseState } from "../states/Exercise";

export interface ChooseExerciseProps {
  name: string;
  data: ExerciseState
  onPress: (data: ExerciseState) => void;
  theme: MD3Theme;
}
