import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { WorkoutPlan } from "@/types/states/Plan";
import DifficultyBadge from "@/components/DifficultyBadge";

export default function WorkoutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const id = usePathname();
  const { slug } = useLocalSearchParams();

  const [workout, setWorkout] = useState<WorkoutPlan>();

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid);

          const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const userWorkouts = userData.workouts;

              if (userWorkouts) {
                console.log(id);
                const selectedWorkout =
                  userWorkouts[parseInt(id.split("/").pop()!)]; // Get the exercise based on the slug
                setWorkout(selectedWorkout);
                console.log("selected workout: " + selectedWorkout);
                console.log("Updated user workouts:", userWorkouts);
              }
              // Use the updated workouts data here
            } else {
              console.log("No user document found");
            }
          });

          return () => unsubscribe(); // Unsubscribe when component unmounts
        }
      } catch (error) {
        console.error("Error fetching user workouts:", error);
      }
    };

    fetchUserWorkouts();
  }, [id]); // Re-run effect when the slug changes

  const getTargetMuscles = () => {
    if (workout) {
      const targetMusclesArray = workout.exercises.map(
        (exercise) => exercise.target
      );

      const targetMuscles = targetMusclesArray.flat();

      const uniqueTargetMuscles = [...new Set(targetMuscles)];

      return uniqueTargetMuscles.join(", ").toUpperCase();
    } else {
      return "NO DATA";
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
      {/* Header */}
      <View style={{ ...styles.header, backgroundColor: theme.colors.surface }}>
        <View style={styles.leftContainer}>
          <IconButton
            icon="arrow-left"
            size={30}
            iconColor={theme.colors.onSurface}
            rippleColor={"rgba(125,125,125,0.2)"}
            onPress={() => router.back()}
          />
        </View>
        <View style={styles.rightContainer}>
          <IconButton
            icon="trash-can"
            iconColor={theme.colors.primary}
            size={26}
            onPress={() => console.log("Pressed")}
          />
          <IconButton
            icon="square-edit-outline"
            iconColor={theme.colors.primary}
            size={26}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.informationContainer}>
          <Text variant="headlineMedium" style={styles.workoutTitle}>
            {(workout && workout.title.toUpperCase()) || "NO NAME"}
          </Text>
          <View style={styles.informationItemContainer}>
            {workout && <DifficultyBadge difficulty={workout.difficulty} />}
          </View>
          <View style={styles.informationItemContainer}>
            <Icon
              library="Feather"
              name="target"
              color={theme.colors.outline}
              size={24}
            />
            <Text
              variant="titleMedium"
              style={{ ...styles.text, color: theme.colors.outline }}
            >
              {getTargetMuscles()}
            </Text>
          </View>
          <View style={styles.informationItemContainer}>
            <Icon
              library="MaterialCommunityIcons"
              name="dumbbell"
              color={theme.colors.outline}
              size={24}
            />
            <Text
              variant="titleMedium"
              style={{ ...styles.text, color: theme.colors.outline }}
            >
              {(workout && workout.exercises.length) || "N/A"} EXERCISES
            </Text>
          </View>
        </View>
        <Button
          style={{
            ...styles.startButton,
            backgroundColor: theme.colors.primary,
          }}
          mode="contained"
          onPress={() => console.log("PRESSED")}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.startButtonText, color: theme.colors.onPrimary }}
          >
            START WORKOUT
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 25,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: "ProtestStrike",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    alignItems: "center",
    fontSize: 18,
  },
  text: {
    fontFamily: "ProtestStrike",
  },
  informationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  workoutTitle: {
    fontFamily: "ProtestStrike",
  },
  informationItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  startButton: {
    width: "100%",
    borderRadius: 10,
  },
  startButtonText: {
    fontFamily: "ProtestStrike",
  },
});
