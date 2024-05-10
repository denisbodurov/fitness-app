import React, { useContext, useEffect, useState } from "react";
import { Redirect, Tabs, useSegments } from "expo-router";
import { Snackbar, TouchableRipple, Text, useTheme } from "react-native-paper";
import Icon from "@/components/Icon";
import { Platform, StyleSheet } from "react-native";
import { FirebaseContext } from "@/providers/FirebaseProvider";
import { IconProps } from "@/types/components/Icon";
import NetInfo from "@react-native-community/netinfo";

export default function TabLayout() {
  const theme = useTheme();
  const { user } = useContext(FirebaseContext);

  const segment = useSegments();
  const page = segment[segment.length - 1];
  const pagesToHideTabBar = ["home", "workouts", "motivation", "profile"];

  const [connected, setConnected] = useState(true);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if(state.isConnected) {
        if(!connected) {
          setReconnected(true);
        }
        setConnected(true);
      } else {
        setConnected(false);
      }
    });

    return unsubscribe();
  });

  if (user) {
    return (
      <>
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
                case "motivation":
                  [iconName, iconLibrary] = [
                    "meditation",
                    "MaterialCommunityIcons",
                  ];
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
              display: !pagesToHideTabBar.includes(page) ? "none" : "flex",
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
            name="motivation"
            options={{
              title: "Motivation",
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
        <Snackbar
          elevation={0}
          visible={!connected}
          onDismiss={() => console.log("Cant")}
          style={{
            ...styles.snackbar,
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.text, color: theme.colors.surfaceVariant }}
          >
            NO INTERNET CONNECTION
          </Text>
        </Snackbar>
        <Snackbar
          visible={reconnected}
          onDismiss={() =>
            setReconnected(false)
          }
          style={{ backgroundColor: "#5cb85c" }}
          duration={3000}
          action={{
            label: "DISMISS",
            labelStyle: {
              color: "white",
              fontFamily: "ProtestStrike",
            },
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: "white", fontFamily: "ProtestStrike" }}
          >
            RECONNECTED SUCCESSFULLY
          </Text>
        </Snackbar>
      </>
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
  snackbar: {
    position: "absolute",
    elevation: 0,
    bottom: 0,
    marginBottom: 75,
  },
  text: {
    fontFamily: "ProtestStrike",
  },
});
