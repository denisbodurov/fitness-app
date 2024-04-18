// Header.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { IconButton, Text } from "react-native-paper";
import { ExerciseProps } from "@/types/components/Exercise";

function Exercise({name, order, information, onRemove, theme } : ExerciseProps) {
  return (
    <View style={{...styles.container, backgroundColor: theme.colors.surface}}>
        <View style={styles.imageContainer}>
            <Image source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400"}}/>
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
    borderWidth: 1,
    borderColor: "red"
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
  }
});

export default Exercise;
