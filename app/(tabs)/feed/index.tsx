import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "@/components/Post";
import { useTheme } from "react-native-paper";

export default function Feed () {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Post title="New epic feed" type="NEWS" postDate={new Date()} theme={theme}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    gap: 20,
  },
});
