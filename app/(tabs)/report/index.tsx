import CustomBarChart from "@/components/CustomBarChart";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function TabOneScreen() {
  const theme = useTheme();
  const barData = [
    { value: 250, label: "M" },
    { value: 500, label: "T" },
    { value: 745, label: "W" },
    { value: 320, label: "T" },
    { value: 600, label: "F" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        ...style.mainContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <CustomBarChart data={barData} theme={theme} />
      <CustomBarChart data={barData} theme={theme} />
      <CustomBarChart data={barData} theme={theme} />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    padding: 20,
  },
});
