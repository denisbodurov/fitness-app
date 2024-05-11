import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Snackbar, TouchableRipple, Text, useTheme } from "react-native-paper";
import { Redirect, Tabs, useSegments } from "expo-router";
import { FirebaseContext } from "@/providers/FirebaseProvider";
import Icon from "@/components/Icon";
import { IconProps } from "@/types/components/Icon";
import NetInfo from "@react-native-community/netinfo";

function TabLayout() {
  const theme = useTheme(); // Getting the theme from the PaperProvider
  const segment = useSegments(); // Getting all segments from the URL as an array
  const page = segment[segment.length - 1]; // Getting the last segment in the aray which is the current endpoint
  const pagesToDisplayTabBar = ["home", "workouts", "motivation", "profile"]; // Declaring an array of endpoints for which we want the TabBar to be visible
  const { user } = useContext(FirebaseContext); // Getting the user object from the FirebaseProvider

  // Defining a state that's going to keep information about the user's connection
  const [network, setNetwork] = useState({
    offline: false,
    reconnected: false,
  });

  // Side effect that listens to changes in the user's connection and updates the state accordingly
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        if (network.offline) {
          setNetwork({ offline: false, reconnected: true });
        }
      } else {
        setNetwork({ offline: true, reconnected: false });
      }
    });

    return unsubscribe();
  }, [network]);

  // Conditionally rendering the TabBar if the user is authenticated
  if (user) {
    // Rendering a TabBar with 4 tabs - [home, workouts, motivaiton, profile]
    return (
      <>
        <Tabs
          screenOptions={({ route }) => ({
            //Rendering the icons for the tab bar based on the routes
            tabBarIcon: ({ color }) => {
              let iconName: string;
              let iconLibrary: IconProps["library"];

              // Assigning the respective icon for each tab based on the route's name
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
              //Returning the respective icon for each tab
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
              //Conditionally hiding the TabBar for specific routes
              display: !pagesToDisplayTabBar.includes(page) ? "none" : "flex",
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
        {/* Snackbar responsible for notifying the user when they don't have internet connection */}
        <Snackbar
          elevation={0}
          visible={network.offline}
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
        {/* Snackbar responsible for notifying the user when they have successfully reconnected and have internet connection */}
        <Snackbar
          visible={network.reconnected}
          onDismiss={() =>
            setNetwork((prevNetwork) => {
              return { ...prevNetwork, reconnected: false };
            })
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
    //Redirecting the user if they are not authenticated
    return <Redirect href="/(auth)/sign-in" />;
  }
}

export default TabLayout;

// This is where all of the styles for this component reside
const styles = StyleSheet.create({
  tabBar: {
    height: 70,
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
