import { StyleSheet, View } from "react-native";
import React from "react";
import DefaultWorkout from "./Workout";

export default function WorkoutList() {
  const mockData = [
    {
      bannerURL: "test.com",
      title: "ARMS WORKOUT",
      infromation: "16 EXERCISES - 12 MINUTES",
      difficulty: 1,
      id: 1,
    },
    {
      bannerURL: "test.com",
      title: "LEGS WORKOUT",
      infromation: "6 EXERCISES - 9 MINUTES",
      difficulty: 2,
      id: 2,
    },
    {
      bannerURL: "test.com",
      title: "ABS WORKOUT",
      infromation: "12 EXERCISES - 11 MINUTES",
      difficulty: 3,
      id: 3,
    },

  ];

  const workouts = mockData.map((workout) => {
    return (
      <DefaultWorkout
        key={workout.id}
        id={workout.id}
        bannerURL={workout.bannerURL}
        title={workout.title}
        information={workout.infromation}
        difficulty={workout.difficulty}
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
