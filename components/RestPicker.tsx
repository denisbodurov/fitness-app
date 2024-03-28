// Header.js
import { RestPickerProps } from "@/types/components/RestPicker";
import React from "react";
import { StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

function RestPicker({ value, onValueChange, theme }: RestPickerProps) {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={onValueChange}
      buttons={[
        {
          value: "30",
          label: "30s",
          style: {
            ...styles.segmentedButtons,
            borderColor: theme.colors.primary,
            borderRadius: 10,
          },
          labelStyle: {
            ...styles.segmentedButtonsLabel,
            color: theme.colors.primary,
          },
        },
        {
          value: "45",
          label: "45s",
          style: {
            ...styles.segmentedButtons,
            borderColor: theme.colors.primary,
          },
          labelStyle: {
            ...styles.segmentedButtonsLabel,
            color: theme.colors.primary,
          },
        },
        {
          value: "60",
          label: "60s",
          style: {
            ...styles.segmentedButtons,
            borderColor: theme.colors.primary,
          },
          labelStyle: {
            ...styles.segmentedButtonsLabel,
            color: theme.colors.primary,
          },
        },
        {
          value: "90",
          label: "90s",
          style: {
            ...styles.segmentedButtons,
            borderColor: theme.colors.primary,
            borderRadius: 10,
          },
          labelStyle: {
            ...styles.segmentedButtonsLabel,
            color: theme.colors.primary,
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  segmentedButtons: {
    width: 30,
    borderWidth: 2,
  },
  segmentedButtonsLabel: {
    fontFamily: "ProtestStrike",
    fontSize: 16,
  },
});

export default RestPicker;
