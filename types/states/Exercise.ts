export interface ExerciseState {
    id: string;
    order?: number;
    name: string;
    description: string;
    imageURL: string;
    videoURL: string;
    target: string[];
    sets?: number;
    reps?: number;
}