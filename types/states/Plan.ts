import { ExerciseState } from "./Exercise";


export interface WorkoutPlan {
    id: string;
    title: string;
    difficulty: number;
    setRest: number,
    exerciseRest: number,
    exercises: ExerciseState[],
}