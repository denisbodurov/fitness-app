import { StyleSheet, View } from "react-native";
import React from "react";
import Workout from "./Workout";
import { WorkoutListProps } from "@/types/components/Workout";

export default function WorkoutList({data, theme} : WorkoutListProps) {

  const workouts = data.map((workout) => {
    return (
      <Workout
        key={workout.id}
        id={workout.id}
        bannerURL={workout.bannerURL}
        title={workout.title}
        information={workout.information}
        difficulty={workout.difficulty}
        theme={theme}
      />
    );
  });

  return <View style={style.workoutsContainer}>{workouts}</View>;
}

const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
        gap: 20
    }
});
