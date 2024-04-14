import React, { useContext } from "react";
import { Redirect, Tabs, useSegments } from "expo-router";
import { TouchableRipple, useTheme } from "react-native-paper";
import Icon from "@/components/Icon";
import { Platform, StyleSheet } from "react-native";
import { FirebaseContext } from "@/providers/FirebaseProvider";
import { IconProps } from "@/types/components/Icon";

export default function TabLayout() {
  const theme = useTheme();
  const { user } = useContext(FirebaseContext);

  const segment = useSegments();
  const page = segment[segment.length - 1];
  const pagesToHideTabBar = ["edit-schedule", "settings"];

  if (user) {
    return (
      <Tabs
        screenOptions={({ route }) => ({
          //Rendering the icons for the tab bar based on the routes
          tabBarIcon: ({ color }) => {
            let iconName: string;
            let iconLibrary: IconProps["library"];

            switch (route.name) {
              case "home":
                [iconName, iconLibrary] = ["house-chimney", "FontAwesome6"];
                break;
              case "workouts":
                [iconName, iconLibrary] = [
                  "dumbbell",
                  "MaterialCommunityIcons",
                ];
                break;
              case "feed":
                [iconName, iconLibrary] = ["newspaper", "FontAwesome6"];
                break;
              case "profile":
                [iconName, iconLibrary] = ["user", "FontAwesome"];
                break;
              default:
                [iconName, iconLibrary] = ["question", "AntDesign"];
                break;
            }
            return (
              <Icon
                library={iconLibrary}
                name={iconName}
                color={color}
                size={25}
              />
            );
          },
          //Rendering the buttons that are going to wrap each tab item
          tabBarButton: (props) => {
            return (
              <TouchableRipple style={{ flex: 1 }} borderless {...props}>
                {props.children}
              </TouchableRipple>
            );
          },
          tabBarStyle: {
            ...styles.tabBar,
            display: pagesToHideTabBar.includes(page) ? "none" : "flex", // Hide tab bar for listed routes
            backgroundColor: theme.colors.surface,
          },
          tabBarLabelStyle: styles.tabBarItemLabel,
          tabBarItemStyle: styles.tabBarItem,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: "Workouts",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: "Feed",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tabs>
    );
  } else {
    <Redirect href="/(auth)/sign-in" />;
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === "ios" ? 100 : 70,
    borderTopWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: "hidden",
  },
  tabBarItem: {
    flexDirection: "column",
    overflow: "visible",
    padding: 5,
  },
  tabBarItemLabel: {
    fontFamily: "ProtestStrike",
    fontSize: 12,
  },
});
