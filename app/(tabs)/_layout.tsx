import React from "react";
import { withLayoutContext } from "expo-router";
import {
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from "react-native-paper/react-navigation";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import Icon from "@/components/Icon";
import { StyleSheet } from "react-native";

const { Navigator } = createMaterialBottomTabNavigator();

export const Tabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      shifting={true}
      inactiveColor={theme.colors.outline}
      activeColor={theme.colors.primary}
      barStyle={{ ...style.navigator, backgroundColor: theme.colors.surface }}
      screenOptions={({ route }) => {
        const routeParts = route.name.split('/'); // Split route name
        const isSettings = routeParts[routeParts.length - 1] === 'settings'; // Check for Settings

        return ({
          tabBarVisible: false // Hide tab bar for Settings
        } as MaterialBottomTabNavigationOptions);
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon
              library="FontAwesome6"
              color={color}
              name="house-chimney"
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <Icon
              library="MaterialCommunityIcons"
              color={color}
              name="dumbbell"
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <Icon library="FontAwesome" color={color} name="bell" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon library="FontAwesome" color={color} name="user" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  navigator: {
    height: 70,
  },
});
