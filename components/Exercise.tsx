// Header.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { IconButton, Text } from "react-native-paper";

function RestPicker({ }) {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400"}}/>
        </View>
        <Text variant="titleMedium" style={styles.title}>BANANA LATERAL RISES</Text>
        <Text variant="titleMedium" style={styles.information}>3 x 15</Text>
        <IconButton icon="delete" iconColor="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "red"
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "red"
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  information: {
    fontFamily: "LatoBold",
  }
});

export default RestPicker;
