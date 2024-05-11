import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text, TouchableRipple } from "react-native-paper";
import { SelectableExerciseProps } from "@/types/components/SelectableExercise";
import { exerciseImages } from "@/constants/images";

function SelectableExercise({ name, data, onPress, theme }: SelectableExerciseProps) {

  const URL = exerciseImages[data.imageURL.split('.')[0] as keyof typeof exerciseImages];    

  return (
    <TouchableRipple
      style={{ ...styles.button, backgroundColor: theme.colors.background }}
      onPress={() => onPress(data)}
      rippleColor="rgba(128, 128, 128, .30)"
    >
      <View
        style={{
          ...styles.container,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={URL}
          />
          <View style={styles.dim}/>
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {name.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default SelectableExercise;

// This is where all of the styles for this component reside
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150,
    height: 200,
    maxHeight: 250,
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    objectFit: "cover",
  },
  textContainer: {
    height: 50,
    maxHeight: 100,
    width: "100%",
    padding: 10,
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  button: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%"
  },
  dim: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});


