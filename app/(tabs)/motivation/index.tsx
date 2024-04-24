import { Platform, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Post from "@/components/Post";
import { Button, useTheme, Text } from "react-native-paper";

export default function Feed() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
      }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.motivationContainer}>
          <Text
            variant="titleMedium"
            style={{
              ...styles.text,
              ...styles.motivation,
              borderColor: theme.colors.primary,
            }}
          >
            “I must not fear. Fear is the mind-killer. Fear is the little-death
            that brings total obliteration. I will face my fear. I will permit
            it to pass over me and through me. And when it has gone past I will
            turn the inner eye to see its path. Where the fear has gone there
            will be nothing. Only I will remain.”
          </Text>
          <Text variant="titleMedium" style={{ ...styles.text, ...styles.author }}>
            ~ Frank Herbert, Dune
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            ...styles.button,
            backgroundColor: theme.colors.primary,
          }}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.text, color: theme.colors.onPrimary }}
          >
            MOTIVATE ME
          </Text>{" "}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  button: {
    width: "100%",
  },
  buttonContainer: {
    padding: 20,
  },
  text: {
    fontFamily: "ProtestStrike",
  },
  author: {
    padding: 10,
  },
  motivation: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  motivationContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
});
