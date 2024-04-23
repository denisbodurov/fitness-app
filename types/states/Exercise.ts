export interface ExerciseState {
    order?: number;
    id: string;
    name: string;
    description: string;
    imageURL: string;
    videoURL: string;
    target: string[];
    sets?: number;
    reps?: number;
}