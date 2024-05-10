import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Workout from "./Workout";
import { WorkoutListProps } from "@/types/components/Workout";
import { defaultWorkoutImages } from "@/constants/images";

export default function WorkoutList({data, theme} : WorkoutListProps) {

  const workouts = data.map((workout) => {
    const URL = defaultWorkoutImages[workout.bannerURL.split('.')[0] as keyof typeof defaultWorkoutImages];    

    return (
      <Workout
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

const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
        gap: 20
    }
});
