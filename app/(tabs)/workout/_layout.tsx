import React from "react";
import { withLayoutContext } from "expo-router";
import { useTheme } from "react-native-paper";

import Icon from "@/components/Icon";
import { StyleSheet } from "react-native";

import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();

export const Tabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surface
        },
        tabBarLabelStyle: {
          color: theme.colors.onSurface,
          fontFamily: "ProtestStrike"
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          height: 3
        }
      }}>
        <Tabs.Screen name="index" options={{ title: "Walk" }} />
        <Tabs.Screen name="run" options={{ title: "Run" }} />
        <Tabs.Screen name="bike" options={{ title: "Bike" }} />
      </Tabs>
    </SafeAreaView>
  );
}
