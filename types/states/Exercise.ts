export interface ExerciseState {
    order?: number;
    id: string;
    name: string;
    description: string;
    difficulty: number;
    imageURL: string;
    videoURL: string;
    target: string[];
    sets?: number;
    reps?: number;
}