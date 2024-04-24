import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WorkoutList from "@/components/WorkoutList";
import Schedule from "@/components/Schedule";
import { ScheduleData } from "@/types/components/Schedule";
import defaultSchedule from "@/constants/defaultSchedule";
import Progress from "@/components/Progress";
import { WorkoutData } from "@/types/components/Workout";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";

export default function HomeScreen() {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);
  const [defaultWorkouts, setDefaultWorkouts] = useState("");
  const [dailyProgress, setDailyProgress] = useState();
  const [status, setStatus] = useState({
    isLoading: true,
    error: "",
  });

  const insets = useSafeAreaInsets();

  const theme = useTheme();

  useEffect(() => {
    const fetchUserSchedule = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid); // Replace with your user ID

          // Listen for real-time updates on the user document
          const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userSchedule = docSnapshot.data().schedule || null;
              setSchedule(userSchedule);
              console.log("Updated user schedule:", userSchedule);
              // Use the updated schedule data here
            } else {
              console.log("No user document found");
              setSchedule(defaultSchedule); // Reset schedule if document doesn't exist
            }
          });

          return () => unsubscribe(); // Unsubscribe when component unmounts
        }

      } catch (error) {
        console.error("Error fetching user schedule:", error);
      }
    };

    fetchUserSchedule();
  }, []); // Empty dependency array ensures useEffect runs only once

  const mockData: WorkoutData[] = [
    {
      url: "arms-beginner.jpg",
      title: "ARMS WORKOUT",
      information: "3 EXERCISES",
      difficulty: 1,
      id: 1,
    },
    {
      url: "legs-beginner.jpg",
      title: "LEGS WORKOUT",
      information: "3 EXERCISES",
      difficulty: 1,
      id: 4,
    },
    {
      url: "legs-beginner.jpg",
      title: "LEGS WORKOUT",
      information: "6 EXERCISES",
      difficulty: 2,
      id: 2,
    },
    {
      url: "abs-beginner.jpg",
      title: "ABS WORKOUT",
      information: "12 EXERCISES",
      difficulty: 3,
      id: 3,
    },
  ];

  const mockStats = {
    workouts: 12,
    calories: 1204,
    minutes: 120,
  };

  useEffect(() => {
    try {
      //Try to fetch data
    } catch {
      //Catch thrown errors and set default data
      setSchedule(defaultSchedule);
    }
  }, []);

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
      <ScrollView
        contentContainerStyle={{
          ...style.body,

          backgroundColor: theme.colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Data container providing information about the user's daily progress */}
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Icon
              library="MaterialCommunityIcons"
              name="progress-check"
              color={theme.colors.primary}
            />
            <Text style={style.sectionTitle} variant="headlineSmall">
              DAILY PROGRESS
            </Text>
          </View>

          <View
            style={{
              ...style.progressContainer,
              backgroundColor: theme.colors.surface,
            }}
          >
            <Progress data={mockStats} theme={theme} />
          </View>
        </View>
        {/* Data container that provides info about the user's weekly workout schedule */}
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Icon
              library="FontAwesome"
              name="calendar"
              color={theme.colors.primary}
            />
            <Text style={style.sectionTitle} variant="headlineSmall">
              SCHEDULE
            </Text>
          </View>
          <Schedule scheduleData={schedule} theme={theme} />
        </View>
        {/* Three separate sections with workouts of 3 different difficulty levels */}
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Text style={style.sectionTitle} variant="headlineSmall">
              BEGINNER
            </Text>
          </View>
          <WorkoutList data={mockData} theme={theme} />
        </View>
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Text style={style.sectionTitle} variant="headlineSmall">
              INTERMEDIATE
            </Text>
          </View>
        </View>
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Text style={style.sectionTitle} variant="headlineSmall">
              ADVANCED
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  body: {
    alignItems: "center",
    gap: 30,
    padding: 20,
  },
  viewPager: {
    flex: 1,
    width: "100%",
    height: 200,
    padding: 20,
  },
  section: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },
  sectionTitle: {
    fontFamily: "ProtestStrike",
  },
  sectionTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    padding: 20,
    elevation: 5,
  },
  difficultyContainer: {
    flexDirection: "row",
    padding: 0,
    gap: 5,
  },
});
