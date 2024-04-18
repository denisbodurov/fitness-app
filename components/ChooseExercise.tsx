// Header.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text, TouchableRipple } from "react-native-paper";
import { ChooseExerciseProps } from "@/types/components/ChooseExercise";

function ChooseExercise({ name, data, onPress, theme }: ChooseExerciseProps) {
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
            source={{
              uri: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400",
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

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
  touchable: {
    width: "45%",
    maxWidth: "50%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: 150,
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
  },
});

export default ChooseExercise;
