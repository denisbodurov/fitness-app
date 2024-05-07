import Icon from "@/components/Icon";
import Progress from "@/components/Progress";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { Activity } from "@/types/states/Activity";
import { UserData } from "@/types/states/UserData";
import { Link } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Avatar, List, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [userData, setUserData] = useState<UserData | undefined>()
  const [totalProgress, setTotalProgress] = useState({
    workouts: 0,
    minutes: 0,
  })
  const [status, setStatus] = useState({
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
  
        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid);
  
          // Listen for real-time updates on the user document
          const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const activity = docSnapshot.data().activity || [];

              if(userData){
                setUserData({
                  displayName: currentUser.displayName,
                  weight: userData.weight,
                  height: userData.height,
                  gender: userData.gender,
                  dob: userData.dob,
                  registrationDate: currentUser.metadata.creationTime,
                });
              } else {
                setStatus({ ...status, error: "COULD NOT FETCH DATA" })
              }

              if (activity) {
                const totalMinutes = Math.floor(
                  activity.reduce(
                    (acc: number, activity: Activity) => acc + activity.seconds,
                    0
                  ) / 60
                );
                setTotalProgress({
                  workouts: activity.length,
                  minutes: totalMinutes,
                });
              } else {
                setTotalProgress({ workouts: 0, minutes: 0 });
              }

            } else {
              setStatus({ ...status, error: "RESOURCE NOT FOUND" }); // Or handle missing document differently
            }
          });
  
          // Cleanup function to unsubscribe when component unmounts
          return () => unsubscribe();
        } else {
          setStatus({ ...status, error: "NO AUTH SESSION FOUND" });
        }
      } catch (error) {
        setStatus({ ...status, error: `FAILED FETCHING DATA: ${error}` });
      } finally {
        setStatus((prevStatus) => ({ ...prevStatus, isLoading: false }));
      }
    };
  
    fetchUserData();
  }, []); // Empty dependency array to run only once on mount

  const creationDate = new Date(userData?.registrationDate!).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.');

  const calculateAge = () => {
    const birthDate = userData?.dob?.toDate(); // Optional chaining
  
    if (birthDate) {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } else {
      // Handle missing birthDate (e.g., display "Unknown" or placeholder)
      return "Unknown";
    }
  };
  

  const calculateBMI = () => {
    if(userData) {
      if (userData.weight <= 0 || userData.height <= 0 || !userData.gender) {
        console.error("Invalid input: weight, height, and gender are required.");
        return null;
      }
    
      let bmi = userData.weight / ((userData.height / 100) * (userData.height / 100));
    
      // Optional adjustment for females (replace with your logic if needed)
      if (userData.gender.toLowerCase() === "female") {
        bmi *= 0.9; // Adjust formula slightly for females (optional)
      }
  
      let category;
      if(bmi >= 0 && bmi <= 18.5) {
        category = "Underweight";
      } else if ( bmi > 18.5 && bmi <= 25) {
        category = "Normal";
      } else if (bmi > 25 && bmi <= 30){
        category = "Overweight";
      } else {
        category = "Obese";
      }
    
      return `BMI: ${bmi.toFixed(2)} (${category})`;
    }
    
  }

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const renderContent = () => {
    if (status.isLoading) {
      return (
        <View style={style.statusContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    }

    if (status.error) {
      return (
        <View style={style.statusContainer}>
          <Text variant="headlineLarge" style={style.title}>SOMETHING WENT WRONG</Text>
        </View>
      );
    }

    if(userData) {
      return (
        <ScrollView
          contentContainerStyle={style.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              ...style.container,
              ...style.avatarContainer,
              backgroundColor: theme.colors.surface,
            }}
          >
            <Avatar.Image
              size={75}
              source={require("../../../assets/images/floppa.jpg")}
            />
            <View style={style.userInfoContainer}>
              <Text
                variant="titleLarge"
                style={{ ...style.userInfo, color: theme.colors.onSurface }}
              >
                {userData?.displayName}
              </Text>
              <View
                style={{ ...style.badge, backgroundColor: theme.colors.primary }}
              >
                <Text
                  variant="labelSmall"
                  style={{ ...style.userInfo, color: theme.colors.onPrimary }}
                >
                  Registered: {creationDate}
                </Text>
              </View>
            </View>
            <Link asChild href="/(tabs)/profile/settings">
              <TouchableOpacity>
                <Icon
                  library="FontAwesome5"
                  name="cog"
                  color={theme.colors.primary}
                  size={25}
                />
              </TouchableOpacity>
            </Link>
          </View>
          <View style={style.section}>
            <View style={style.sectionTitleContainer}>
              <Icon
                library="Ionicons"
                name="time"
                color={theme.colors.primary}
                size={24}
              />
              <Text style={style.title} variant="titleMedium">
                SUMMARY
              </Text>
            </View>
            <View
              style={{
                ...style.container,
                backgroundColor: theme.colors.surface,
              }}
            >
              <Progress data={totalProgress} theme={theme} />
            </View>
          </View>
  
          <View style={style.section}>
            <View style={style.sectionTitleContainer}>
              <Icon
                library="MaterialCommunityIcons"
                name="human-male-board-poll"
                color={theme.colors.primary}
                size={24}
              />
              <Text style={style.title} variant="titleMedium">
                USER INFORMATION
              </Text>
            </View>
            <View
              style={{
                ...style.container,
                ...style.informationContainer,
                backgroundColor: theme.colors.surface,
              }}
            >
              <List.Section
                style={{
                  backgroundColor: theme.colors.surface,
                }}
              >
                <List.Item
                  title={`Age: ${calculateAge()}`}
                  titleStyle={{ ...style.title, color: theme.colors.onSurface }}
                  left={() => (
                    <Icon
                      library="MaterialCommunityIcons"
                      name="human-cane"
                      color={theme.colors.primary}
                      size={28}
                    />
                  )}
                />
                <List.Item
                  title={`Gender: ${capitalizeFirstLetter(userData?.gender!)}`}
                  titleStyle={{ ...style.title, color: theme.colors.onSurface }}
                  left={() => (
                    <Icon
                      library="MaterialCommunityIcons"
                      name="gender-male-female"
                      color={theme.colors.primary}
                      size={28}
                    />
                  )}
                />
                <List.Item
                  title={`Weight: ${userData?.weight}kg`}
                  titleStyle={{ ...style.title, color: theme.colors.onSurface }}
                  left={() => (
                    <Icon
                      library="MaterialCommunityIcons"
                      name="weight"
                      color={theme.colors.primary}
                      size={25}
                    />
                  )}
                />
                <List.Item
                  title={`Height: ${userData?.height}cm`}
                  titleStyle={{ ...style.title, color: theme.colors.onSurface }}
                  left={() => (
                    <Icon
                      library="MaterialCommunityIcons"
                      name="human-male-height"
                      color={theme.colors.primary}
                      size={28}
                    />
                  )}
                />
                <List.Item
                  title={`BMI: ${calculateBMI()}`}
                  titleStyle={{ ...style.title, color: theme.colors.onSurface }}
                  left={() => (
                    <Icon
                      library="FontAwesome"
                      name="heartbeat"
                      color={theme.colors.primary}
                      size={28}
                    />
                  )}
                />
              </List.Section>
            </View>
          </View>
  
        </ScrollView>
      );
    }
    
  };


  return (
    <View
      style={{
        ...style.safeArea,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
      }}
    >
      {renderContent()}
    </View>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flex: 1,
    width: "100%",
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  section: {
    flexDirection: "column",
    gap: 10,
  },
  sectionTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  mainContainer: {
    flexDirection: "column",
    gap: 15,
    padding: 20,
  },
  container: {
    width: "100%",
    padding: 15,
    elevation: 5,
    borderRadius: 25,
  },
  avatarContainer: {
    flexDirection: "row",
    gap: 10,
  },
  informationContainer: {
    paddingVertical: 0,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 5,
    padding: 5,
  },
  progressContainer: {
    flexDirection: "column",
    gap: 10,
  },
  userInfo: {
    fontFamily: "ProtestStrike",
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  badge: {
    borderRadius: 10,
    padding: 5,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",  
  }
});
