import { createContext, useState } from 'react';

export interface Exercise {
    name: string;
    description: string;
    sets: number;
    reps: number;
  }
  

export interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  updateExercise: (index: number, exercise: Exercise) => void;
  removeExercise: (index: number) => void;
  title: string;
  setTitle: (title: string) => void;
  levelOfDifficulty: string;
  setLevelOfDifficulty: (level: string) => void;
  restTime: string;
  setRestTime: (time: string) => void;
}

export const ExerciseContext = createContext<ExerciseContextType | null>(null);

const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState<string>('');
  const [levelOfDifficulty, setLevelOfDifficulty] = useState<string>('');
  const [restTime, setRestTime] = useState<string>('');

  

    const addExercise = (exercise: Exercise) => {
        setExercises([
            ...exercises,
            exercise
        ])
    };

    const updateExercise = (index: number, exercise: Exercise) => {
        console.log("Still in development....")
    };

    const removeExercise = (index: number) => {
        setExercises(
            exercises.filter((currentExercise, currentIndex) => currentIndex !== index)
        )
    };

  // ... rest of the provider component logic

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        addExercise,
        updateExercise,
        removeExercise,
        title,
        setTitle,
        levelOfDifficulty,
        setLevelOfDifficulty,
        restTime,
        setRestTime,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseProvider;
