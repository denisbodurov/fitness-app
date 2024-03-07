import { StyleSheet, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { CustomBarChartProps } from "@/types/components/CustomBarChart";


export default function CustomBarChart({data, theme} : CustomBarChartProps) {

  return (
    <View
        style={{ ...style.container, backgroundColor: theme.colors.surface }}
      >
        <BarChart
          barWidth={20}
          stepHeight={50}
          spacing={15}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={theme.colors.primary}
          data={data}
          rulesColor={theme.colors.primary}
          yAxisThickness={0}
          xAxisThickness={2}
          yAxisColor={theme.colors.primary}
          xAxisColor={theme.colors.primary}
          yAxisTextStyle={{
            ...style.label,
            fontSize: 12,
            color: theme.colors.primary,
          }}
          xAxisLabelTextStyle={{ ...style.label, color: theme.colors.primary }}
        />
      </View>
  );
}

const style = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      padding: 20,
      elevation: 5,
    },
    label: {
      fontFamily: "ProtestStrike",
    },
  });

