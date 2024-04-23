// Header.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { IconButton, Text } from "react-native-paper";
import { ExerciseProps } from "@/types/components/Exercise";
import { exerciseImages } from "@/constants/images";

function Exercise({name, order, information, imageURL, onRemove, theme } : ExerciseProps) {

  const URL = exerciseImages[imageURL.split('.')[0] as keyof typeof exerciseImages];

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.surface}}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={URL}/>
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>{name}</Text>
          {information && <Text variant="titleMedium" style={styles.information}>{information}</Text>}
        </View>
        <IconButton icon="delete" iconColor="red" onPress={() => onRemove(order)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    gap: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 10,
  },
  imageContainer: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  information: {
    fontFamily: "LatoBold",
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default Exercise;
