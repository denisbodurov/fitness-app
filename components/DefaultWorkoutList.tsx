import { StyleSheet, View } from "react-native";
import DefaultWorkout from "./DefaultWorkout";
import { DefaultWorkoutListProps } from "@/types/components/DefaultWorkout";
import { defaultWorkoutImages } from "@/constants/images";

function DefaultWorkoutList({data, theme} : DefaultWorkoutListProps) {

  const workouts = data.map((workout) => {
    const URL = defaultWorkoutImages[workout.bannerURL.split('.')[0] as keyof typeof defaultWorkoutImages];    

    return (
      <DefaultWorkout
        key={workout.id}
        id={workout.id!}
        bannerURL={URL}
        title={workout.title}
        information={workout.exercises.length + " EXERCISES"}
        difficulty={workout.difficulty}
        theme={theme}
      />
    );
  });

  return <View style={style.workoutsContainer}>{workouts}</View>;
}

export default DefaultWorkoutList;

// This is where all of the styles for this component reside
const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
        gap: 20
    }
});
