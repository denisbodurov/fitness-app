import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import React from "react";
import Icon from "./Icon";
import { Link } from "expo-router";
import { DayType, ScheduleType } from "@/types/components/Schedule";

export default function Schedule({scheduleData, theme } : ScheduleType) {

  return (
    <View style={{...style.mainContainer, backgroundColor: theme.colors.surface}}>
      <View style={style.headerContainer}>
        <Text variant="titleMedium" style={style.title}>
          MY WEEK
        </Text>
        <Link href="/(tabs)/profile">
          <Icon
            library="FontAwesome"
            name="edit"
            size={20}
            color={theme.colors.primary}
          />
        </Link>
      </View>
      <View style={style.contentContainer}>
        <Day theme={theme} rest={scheduleData.monday.rest} day="M" />
        <Day theme={theme} rest={scheduleData.tuesday.rest} day="T" />
        <Day theme={theme} rest={scheduleData.wednesday.rest} day="W" />
        <Day theme={theme} rest={scheduleData.thursday.rest} day="T" />
        <Day theme={theme} rest={scheduleData.friday.rest} day="F" />
        <Day theme={theme} rest={scheduleData.saturday.rest} day="S" />
        <Day theme={theme} rest={scheduleData.sunday.rest} day="S" />
      </View>
    </View>
  );
}

export function Day({ day, rest, theme }: DayType) {
  return (
    <View style={{...style.dayContainer, backgroundColor: theme.colors.surface}}>
      <Text variant="titleSmall" style={style.dayTitle}>
        {day}
      </Text>
      <View style={{...style.indicator, borderColor: theme.colors.primary}} />
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 120,
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontFamily: "LatoBold",
  },
  dayContainer: {
    flex: 1,
    height: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  indicator: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
  },
  dayTitle: {
    fontFamily: "LatoRegular",
  },
});
