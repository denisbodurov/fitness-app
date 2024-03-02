import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import React from "react";
import { Link } from "expo-router";
import { CustomPlanProps } from "@/types/components/CustomPlan";

export default function CustomPlan({
  id,
  title,
  information,
  difficulty,
  theme,
}: CustomPlanProps) {
  return (
    <Link asChild href="/(tabs)/profile">
            <TouchableRipple
        rippleColor="rgba(128, 128, 128, .30)"
        >
        <View style={style.mainContainer}>
            <View
            style={{
                ...style.contentContainer,
                borderBottomColor: theme.colors.outline,
            }}
            >
            <Text variant="titleLarge" style={{...style.title, color: theme.colors.onBackground}}>
                {title.toUpperCase()}
            </Text>
            <View style={style.informationContainer}>
                <Text
                variant="titleSmall"
                style={{
                    ...style.difficulty,
                    color:
                    difficulty === 1
                        ? "cyan"
                        : difficulty === 2
                        ? "orange"
                        : "red",
                }}
                >
                {difficulty == 1
                    ? "EASY"
                    : difficulty == 2
                    ? "INTERMEDIATE"
                    : "ADVANCED"}
                </Text>
                <Text variant="titleSmall"style={{color: theme.colors.outline}}>{String.fromCharCode(0x25CF)}</Text>
                <Text variant="titleSmall" style={{...style.information, color: theme.colors.outline}}>
                {information.toUpperCase()}
                </Text>
            </View>
            </View>
        </View>
        </TouchableRipple>
    </Link>
    
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    padding: 10,
    borderBottomWidth: 3,
  },
  informationContainer: {
    flexDirection: "row",
    gap: 5,
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  difficulty: {
    fontFamily: "ProtestStrike",
  },
  information: {
    fontFamily: "ProtestStrike",
  },
});
