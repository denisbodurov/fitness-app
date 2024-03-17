import { StyleSheet, View } from "react-native";
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

  return <View style={style.workoutsContainer}>{customPlans}</View>;
}

const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
    }
});
