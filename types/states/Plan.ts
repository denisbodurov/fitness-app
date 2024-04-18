import { ExerciseState } from "./Exercise";


export interface WorkoutPlan {
    title: string;
    difficulty: number;
    setRest: number,
    exerciseRest: number,
    exercises: ExerciseState[],
}