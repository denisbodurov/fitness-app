import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DefaultWorkoutList from "@/components/DefaultWorkoutList";
import Schedule from "@/components/Schedule";
import { ScheduleData } from "@/types/components/Schedule";
import defaultSchedule from "@/constants/defaultSchedule";
import Progress from "@/components/Progress";
import { DefaultWorkoutPlan } from "@/types/components/DefaultWorkout";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { Activity } from "@/types/states/Activity";
import { ProgressData } from "@/types/components/Progress";

export default function HomeScreen() {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);
  const [defaultWorkouts, setDefaultWorkouts] =
    useState<DefaultWorkoutPlan[]>();
  const [dailyProgress, setDailyProgress] = useState<
    ProgressData | undefined
  >();

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
              const activity = docSnapshot.data().activity || [];

              if (userSchedule) {
                setSchedule(userSchedule);
              } else {
                setStatus({ ...status, error: "COULD NOT FETCH SCHEDULE" });
              }

              const todaysActivities = activity.filter(
                (currentActivity: Activity) => {
                  const activityDate = currentActivity.date.toDate();

                  const today = new Date();
                  return (
                    activityDate.getFullYear() === today.getFullYear() &&
                    activityDate.getMonth() === today.getMonth() &&
                    activityDate.getDate() === today.getDate()
                  );
                }
              );

              if (todaysActivities) {
                const totalMinutes = Math.floor(
                  todaysActivities.reduce(
                    (acc: number, activity: Activity) => acc + activity.seconds,
                    0
                  ) / 60
                );
                setDailyProgress({
                  workouts: todaysActivities.length,
                  minutes: totalMinutes,
                });
              } else {
                setDailyProgress({ workouts: 0, minutes: 0 });
              }
            } else {
              setStatus({ ...status, error: "USER NOT FOUND" });
            }
          });

          return () => unsubscribe(); // Unsubscribe when component unmounts
        } else {
          setStatus({ ...status, error: "NO AUTH SESSION FOUND" });
        }
      } catch (error) {
        setStatus({ ...status, error: `FAILED FETCHING DATA: ${error}` });
      }
    };

    const fetchWorkouts = async () => {
      try {
        const workoutsRef = collection(FIREBASE_DB, "defaultWorkouts");
        const workoutsQuery = query(workoutsRef);
        const workoutSnapshot = await getDocs(workoutsQuery);

        const fetchedWorkouts = workoutSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          setRest: doc.data().setRest,
          exerciseRest: doc.data().exerciseRest,
          difficulty: doc.data().difficulty,
          exercises: doc.data().exercises,
          bannerURL: doc.data().bannerURL,
        }));

        setDefaultWorkouts(fetchedWorkouts);
      } catch (error) {
        setStatus({ ...status, error: `SOMETHING WENT WRONG: ${error}` });
      }
    };

    const fetchUserSchedulePromise = new Promise((resolve, reject) => {
      fetchUserSchedule().then(resolve).catch(reject);
    });

    const fetchWorkoutsPromise = new Promise((resolve, reject) => {
      fetchWorkouts().then(resolve).catch(reject);
    });

    Promise.all([fetchUserSchedulePromise, fetchWorkoutsPromise]).finally(() =>
      setStatus((prevStatus) => {
        return { ...prevStatus, isLoading: false };
      })
    );
  }, []); // Empty dependency array ensures useEffect runs only once

  const beginner = defaultWorkouts?.filter(
    (workout) => workout.difficulty === 1
  );
  const intermediate = defaultWorkouts?.filter(
    (workout) => workout.difficulty === 2
  );
  const advanced = defaultWorkouts?.filter(
    (workout) => workout.difficulty === 3
  );

  const renderContent = () => {
    if (status.isLoading) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    }

    if (schedule && dailyProgress && beginner && intermediate && advanced) {
      return (
        <ScrollView
          contentContainerStyle={{
            ...styles.body,

            backgroundColor: theme.colors.background,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Data container providing information about the user's daily progress */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Icon
                library="MaterialCommunityIcons"
                name="progress-check"
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle} variant="headlineSmall">
                DAILY PROGRESS
              </Text>
            </View>

            <View
              style={{
                ...styles.progressContainer,
                backgroundColor: theme.colors.surface,
              }}
            >
              <Progress data={dailyProgress} theme={theme} />
            </View>
          </View>
          {/* Data container that provides info about the user's weekly workout schedule */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Icon
                library="FontAwesome"
                name="calendar"
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle} variant="headlineSmall">
                SCHEDULE
              </Text>
            </View>
            <Schedule scheduleData={schedule} theme={theme} />
          </View>
          {/* Three separate sections with workouts of 3 different difficulty levels */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle} variant="headlineSmall">
                BEGINNER
              </Text>
            </View>
            <DefaultWorkoutList data={beginner} theme={theme} />
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle} variant="headlineSmall">
                INTERMEDIATE
              </Text>
            </View>
            <DefaultWorkoutList data={intermediate} theme={theme} />
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle} variant="headlineSmall">
                ADVANCED
              </Text>
            </View>
            <DefaultWorkoutList data={advanced} theme={theme} />
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
      }}
    >
      {renderContent()}
      <Snackbar
        visible={status.error ? true : false}
        onDismiss={() =>
          setStatus((prevStatus) => {
            return { ...prevStatus, error: "" };
          })
        }
        style={{ backgroundColor: theme.colors.errorContainer }}
        duration={3000}
        action={{
          label: "DISMISS",
          labelStyle: {
            color: theme.colors.onBackground,
            fontFamily: "ProtestStrike",
          },
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            color: theme.colors.onErrorContainer,
            fontFamily: "ProtestStrike",
          }}
        >
          {status.error}
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
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
  statusContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
