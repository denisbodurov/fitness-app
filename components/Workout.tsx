import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import React from "react";
import Icon from "./Icon";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { WorkoutProps } from "@/types/components/Workout";

export default function Workout({
  id,
  bannerURL,
  title,
  information,
  difficulty,
  containerHeight = 150
}: WorkoutProps) {
  


  return (
    <View style={{...style.container, height: containerHeight}}>
      <View style={style.difficultyContainer}>
        <Icon
          library="MaterialCommunityIcons"
          name="lightning-bolt"
          color={difficulty == 1 ? "cyan" : difficulty == 2 ? "orange" : "red"}
          size={24}
        />
        <Icon
          library="MaterialCommunityIcons"
          name="lightning-bolt"
          color={difficulty == 1 ? "gray" : difficulty == 2 ? "orange" : "red"}
          size={24}
        />
        <Icon
          library="MaterialCommunityIcons"
          name="lightning-bolt"
          color={difficulty == 1 ? "gray" : difficulty == 2 ? "gray" : "red"}
          size={24}
        />
      </View>
      <Image
        style={style.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={"placeholder"}
        contentFit="cover"
        transition={1000}
      />
      <View style={style.titleContainer}>
        <Text variant="headlineMedium" style={style.title}>
          {title}
        </Text>
        <Text variant="titleMedium" style={style.information}>
          {information}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 20,
    elevation: 5,
    overflow: "hidden",
    backgroundColor: "brown",
  },
  difficultyContainer: {
    flexDirection: "row",
    padding: 10,
    zIndex: 9999
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  information: {
    fontFamily: "LatoBold",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
