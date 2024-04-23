import { Platform, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Post from "@/components/Post";
import { useTheme } from "react-native-paper";

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
        
      </ScrollView>
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
});
