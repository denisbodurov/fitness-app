import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { DataBlockProps, ProgressProps } from "@/types/components/Progress";

export default function Progress({ data, theme }: ProgressProps) {
  return (
    <View style={styles.container}>
      <DataBlock value={data.workouts} suffix={"WORKOUTS"} theme={theme} />
      <DataBlock value={data.calories} suffix={"CAL"} theme={theme} />
      <DataBlock value={data.minutes} suffix={"MINUTES"} theme={theme} />
    </View>
  );
}

export function DataBlock({ value, suffix, theme }: DataBlockProps) {
  return (
    <View style={styles.dataBlockContainer}>
      <Text
        variant="titleLarge"
        style={{ ...styles.stats, color: theme.colors.primary }}
      >
        {value}
      </Text>
      <Text
        variant="titleSmall"
        style={{ ...styles.suffix, color: theme.colors.onSurface }}
      >
        {suffix}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataBlockContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  stats: {
    fontFamily: "ProtestStrike",
  },
  suffix: {
    fontFamily: "LatoBold",
  },
});