import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { DataBlockType } from "@/types/components/DataBlock";

function DataBlock({ value, suffix, theme }: DataBlockType) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    stats: {
      fontFamily: "ProtestStrike",
      color: theme.colors.primary,
    },
    suffix: {
      fontFamily: "LatoBold",
      color: theme.colors.onSurface
    }
  });

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.stats}>
        {value}
      </Text>
      <Text variant="titleSmall" style={styles.suffix}>
        {suffix}
      </Text>
    </View>
  );
}

export default DataBlock;
