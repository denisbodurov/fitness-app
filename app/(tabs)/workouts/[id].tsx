import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { WorkoutPlan } from "@/types/states/Plan";
import DifficultyBadge from "@/components/DifficultyBadge";
import Timer from "@/components/Timer";
import { exerciseGifs } from "@/constants/images";
import { Image } from "expo-image";

export default function WorkoutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const id = usePathname();
  const { slug } = useLocalSearchParams();

  const [workout, setWorkout] = useState<WorkoutPlan>();
  const [modalVisible, setModalVisible] = useState(false);

  //Workout flow related states
  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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

  const handleSkip = () => {
    if(currentExercise + 1 < workout?.exercises.length!) {
      setCurrentExercise(prevIndex => prevIndex + 1)
    }


  }
  console.log(currentExercise)

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
          onPress={() => setModalVisible(true)}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.startButtonText, color: theme.colors.onPrimary }}
          >
            START WORKOUT
          </Text>
        </Button>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              ...styles.modal,
              backgroundColor: theme.colors.background,
            }}
          >
            <View
              style={{
                ...styles.header,
                backgroundColor: theme.colors.surface,
              }}
            >
              <IconButton
                icon="close"
                size={30}
                iconColor={theme.colors.onSurface}
                rippleColor={"rgba(125,125,125,0.2)"}
                onPress={() => setModalVisible(false)}
              />
              <Timer seconds={seconds} />
            </View>
            <View style={styles.modalContent}>
              <View style={styles.modalGifContainer}>
                {/* <Image source={gifs![currentExercise]} style={styles.gif}/> */}
                <View style={styles.dim}/>
                <View style={styles.setsBadge}>
                  <Text variant="titleLarge" style={styles.badgeText}>Set: {currentSet}/{workout?.exercises[currentExercise].sets}</Text>
                </View>
              </View>
              <View style={styles.modalButtonsContainer}>
                <Button mode="contained" style={styles.modalButton}>
                  <Text
                    variant="titleMedium"
                    style={{
                      ...styles.modalButtonText,
                      color: theme.colors.onPrimary,
                    }}
                  >
                    TAP TO FINISH
                  </Text>
                </Button>
                <Button mode="contained" style={styles.modalButton} onPress={handleSkip}>
                  <Text
                    variant="titleMedium"
                    style={{
                      ...styles.modalButtonText,
                      color: theme.colors.onPrimary,
                    }}
                  >
                    SKIP EXERCISE
                  </Text>
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
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
  modal: {
    justifyContent: "flex-start",
    flex: 1,
    height: "100%",
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    gap: 20,
    padding: 30,
  },
  modalButton: {
    minWidth: "100%",
    borderRadius: 10,
  },
  modalButtonText: {
    fontFamily: "ProtestStrike",
  },
  modalGifContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    objectFit: "contain",
    height: "75%",
    width: "100%"
  },
  setsBadge: {
    borderRadius: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    elevation: 3,
  },
  badgeText: {
    color: "black",
    fontFamily: "ProtestStrike",
  },
  gif: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  dim: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
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
