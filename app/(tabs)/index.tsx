import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import CircularProgress, {
  CircularProgressBase,
} from "react-native-circular-progress-indicator";
import { Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const { width } = Dimensions.get("window");

  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [82, 86, 82, 88, 81, 87, 82, 88, 86, 89],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
        strokeWidth: 5, // optional
      },
    ],
    legend: [], // optional
  };

  const chartConfig = {
    width: width * 0.8, // Adjust the inner width to fill 60% of the screen width
    height: 180,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    useShadowColorFromDataset: false,
    propsForDots: {
      r: 3,
    }, // optional
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...styles.mainContainer,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={{...styles.col, gap: 10}}>
          <CircularProgressBase
            value={2737}
            maxValue={5000}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            radius={80}
            duration={1000}
            activeStrokeColor={"rgb(0, 205, 205)"}
          >
            <CircularProgressBase
              value={2737}
              maxValue={5000}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              radius={65}
              duration={800}
              activeStrokeColor={"rgb(252, 181, 0)"}
            />
          </CircularProgressBase>

          <View style={{...styles.row, gap: 20}}>
            <View style={{...styles.row, justifyContent: 'center', alignItems: 'center', gap: 5}}>
              <Icon library="Ionicons" name="footsteps" color="rgb(0, 205, 205)"/>
              <Text variant="labelLarge" style={{...styles.title, color: "rgb(0, 205, 205)"}}>Steps</Text>
            </View>
            <View style={{...styles.row, justifyContent: 'center', alignItems: 'center', gap: 5}}>
              <Icon library="FontAwesome6" name="fire-flame-curved" color="rgb(252, 181, 0)"/>
              <Text variant="labelLarge" style={{...styles.title, color: "rgb(252, 181, 0)"}}>Calories</Text>
            </View>
          </View>
        </View>

        <View style={styles.group}>
          <View style={{ ...styles.row, justifyContent: "flex-start", gap: 5 }}>
            <Icon library="FontAwesome6" name="heart-pulse" color="red" />
            <Text
              variant="titleLarge"
              style={{ ...styles.title, color: theme.colors.onSurface }}
            >
              Heart Rate
            </Text>
          </View>
          <Surface
            elevation={1}
            style={{
              ...styles.containerBPM,
              backgroundColor: theme.colors.surface,
            }}
          >
            {/* <Text variant="headlineSmall" style={{...styles.title, color: theme.colors.onSurface, marginLeft: 25, alignSelf: 'flex-end'}}>{0} BPM</Text> */}
            <LineChart
              style={{ alignSelf: "stretch" }} // Set alignSelf to stretch
              // withHorizontalLabels={false}
              withVerticalLabels={false}
              withInnerLines={false}
              // withInnerLines={false}
              yLabelsOffset={20}
              yAxisSuffix=" BPM"
              data={data}
              bezier={true}
              width={width * 0.8} // Set the width to 60% of the screen width
              height={180}
              chartConfig={chartConfig}
            />
          </Surface>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    gap: 30,
  },
  containerBPM: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    padding: 20,
    paddingTop: 5,
    paddingLeft: 15,
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  information: {
    fontFamily: "LatoBold",
    fontSize: 10,
  },
  group: {
    flex: 1,
    flexDirection: "column",
    padding: 0,
    gap: 5,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
