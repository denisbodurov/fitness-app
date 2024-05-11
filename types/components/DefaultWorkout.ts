import { MD3Theme } from "react-native-paper";
import { WorkoutPlan } from "../states/Plan";

export interface DefaultWorkoutProps {
  id: string;
  title: string;
  information: string;
  difficulty: number;
  bannerURL: string;
  containerHeight?: number;
  theme: MD3Theme
};

export interface DefaultWorkoutPlan extends WorkoutPlan {
  bannerURL: string;
}

// Defining the type of the DefaultWorkoutList component
export interface DefaultWorkoutListProps {
  data: DefaultWorkoutPlan[];
  theme: MD3Theme;
}
