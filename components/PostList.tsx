import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Post from "./Post";
import { PostListProps } from "@/types/components/Post";


export default function CustomPlanList({data, theme} : PostListProps) {

  const customPlans = data.map((plan) => {
    return (
      <Post
        key={plan.id}
        id={plan.id}
        imageURL="testurl"
        title={plan.title}
        type="event"
        postDate={new Date()}
        theme={theme}
      />
    );
  });

  return <ScrollView contentContainerStyle={style.workoutsContainer}>{customPlans}</ScrollView>;
}

const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
    }
});
