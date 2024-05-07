import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { WorkoutPlan } from "@/types/states/Plan";
import DifficultyBadge from "@/components/DifficultyBadge";
import Timer from "@/components/Timer";
import { exerciseGifs } from "@/constants/images";
import { Image } from "expo-image";
import PromptDialog from "@/components/PromptDialog";

export default function WorkoutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const path = usePathname();
  const workoutId = path.split("/").pop()!;

  const [status, setStatus] = useState({
    isLoading: true,
    deleting: false,
    error: "",
  });
  const [workout, setWorkout] = useState<WorkoutPlan | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  //Workout flow related states
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [rest, setRest] = useState(0);
  const [restLabel, setRestLabel] = useState("");
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [gifs, setGifs] = useState();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isWorkoutStarted) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);

        if (rest > 0) {
          setRest((prevRest) => prevRest - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isWorkoutStarted, rest]);

  useEffect(() => {
    setStatus({ ...status, isLoading: true });
    const fetchUserWorkouts = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid);
          const workoutRef = doc(userRef, "workouts", workoutId);

          const unsubscribe = onSnapshot(workoutRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const workoutData = docSnapshot.data();

              if (workoutData) {
                const selectedWorkoutGifs = workoutData.exercises.map(
                  (exe: any) => {
                    return exerciseGifs[
                      exe.videoURL.split(".")[0] as keyof typeof exerciseGifs
                    ];
                  }
                );

                const selectedWorkout = {
                  id: docSnapshot.id,
                  title: workoutData.title,
                  difficulty: workoutData.difficulty,
                  setRest: workoutData.setRest,
                  exerciseRest: workoutData.exerciseRest,
                  exercises: workoutData.exercises,
                };

                setWorkout(selectedWorkout);
                setGifs(selectedWorkoutGifs);
              } else {
                setStatus({
                  ...status,
                  error: `WORKOUT WITH ID ${workoutId} NOT FOUND`,
                });
              }
              // Use the updated workouts data here
            } else {
              setStatus((prevStatus) => {
                return { ...prevStatus, error: `USER DOCUMENT NOT FOUND` };
              });
            }
          });
          return () => unsubscribe(); // Unsubscribe when component unmounts
        } else {
          setStatus((prevStatus) => {
            return { ...prevStatus, error: `NO AUTH SESSION FOUND` };
          });
        }
      } catch (error) {
        setStatus((prevStatus) => {
          return { ...prevStatus, error: `ERROR FETCHING WORKOUT: ${error}` };
        });
      } finally {
        setStatus((prevStatus) => {
          return { ...prevStatus, isLoading: false };
        });
      }
    };

    fetchUserWorkouts();
  }, [workoutId]); // Re-run effect when the slug changes

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

  const handleActivityUpdate = async () => {
    const activityData = {
      seconds: seconds,
      date: new Date(),
    };

    try {
      const currentUser = FIREBASE_AUTH.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = doc(collection(FIREBASE_DB, "users"), uid);

        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.log("User document not found");
          return;
        }

        const userDoc = userSnapshot.data();
        let activityArray = userDoc.activity || [];

        activityArray.push(activityData);

        await updateDoc(userRef, { activity: activityArray });
      } else {
        setStatus({ ...status, error: "AUTH SESSION NOT FOUND" });
      }
    } catch (error) {
      setStatus({ ...status, error: `SOMETHING WENT WRONG: ${error}` });
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  const handleStart = () => {
    if (workout && workout.exercises.length > 0) {
      setModalVisible(true);
      setRestLabel("WORKOUT STARTING IN");
      setRest(3);
      setIsWorkoutStarted(true);
    } else {
      setStatus({ ...status, error: "NO EXERCISES FOUND" });
    }
  };

  const handleSkip = () => {
    if (rest > 0) {
      setRest(0);
    } else {
      if (currentExercise + 1 < workout?.exercises.length!) {
        setCurrentExercise((prevIndex) => prevIndex + 1);
        setCurrentSet(1);
        setRestLabel("TAKE A REST");
        setRest(workout?.exerciseRest!);
      } else {
        setIsWorkoutStarted(false);
        setIsWorkoutFinished(true);
        handleActivityUpdate();
      }
    }
  };

  const handleFinish = () => {
    if (rest > 0) {
      setRest(0);
    } else {
      if (currentSet + 1 <= workout?.exercises[currentExercise].sets!) {
        setCurrentSet((prevSet) => prevSet + 1);
        setRestLabel("TAKE A REST");
        setRest(workout?.setRest!);
      } else {
        handleSkip();
      }
    }
  };

  const handleDelete = async () => {
    setStatus((prevStatus) => {
      return { ...prevStatus, deleting: true };
    });
    try {
      const currentUser = FIREBASE_AUTH.currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = doc(FIREBASE_DB, "users", uid);
        const workoutsRef = collection(userRef, "workouts");

        // Construct a reference to the specific workout document
        const workoutRef = doc(workoutsRef, workoutId);

        // Delete the workout document
        await deleteDoc(workoutRef);

        router.back();
      } else {
        console.error("No user logged in");
      }
    } catch (error) {
      console.error("Error deleting workout plan:", error);
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
            onPress={() => {
              setDialogVisible(true);
            }}
          />
          <IconButton
            icon="square-edit-outline"
            iconColor={theme.colors.primary}
            size={26}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      <PromptDialog
        visible={dialogVisible}
        onCancel={() => setDialogVisible(false)}
        onConfirm={handleDelete}
        theme={theme}
      />

      <View style={styles.contentContainer}>
        <View style={styles.informationContainer}>
          <Text variant="headlineMedium" style={styles.workoutTitle}>
            {(workout && workout.title.toUpperCase()) || "NO NAME"}
          </Text>
          <View>
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
              {getTargetMuscles() || "N/A"}
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
              {(workout && workout.exercises.length) + " EXERCISES"}
            </Text>
          </View>
        </View>
        <Button
          style={{
            ...styles.startButton,
            backgroundColor: theme.colors.primary,
          }}
          mode="contained"
          onPress={handleStart}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.startButtonText, color: theme.colors.onPrimary }}
          >
            START WORKOUT
          </Text>
        </Button>
        {!status.error &&
          !status.isLoading &&
          workout &&
          workout.exercises.length > 0 && (
            <Portal>
              <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                contentContainerStyle={{
                  ...styles.modal,
                  backgroundColor: theme.colors.background,
                }}
              >
                {isWorkoutFinished ? (
                  <View style={styles.finishedContainer}>
                    <Text
                      variant="headlineLarge"
                      style={{ ...styles.text, color: theme.colors.primary }}
                    >
                      WORKOUT FINISHED
                    </Text>
                    <View style={styles.timerContainer}>
                      <Text variant="headlineSmall" style={styles.text}>
                        TOTAL TIME
                      </Text>
                      <Timer seconds={seconds} size={24} />
                    </View>

                    <Button
                      mode="contained"
                      style={styles.modalButton}
                      onPress={() => router.navigate("/(tabs)/workouts")}
                    >
                      <Text
                        variant="titleMedium"
                        style={{
                          ...styles.modalButtonText,
                          color: theme.colors.onPrimary,
                        }}
                      >
                        BACK TO WORKOUTS
                      </Text>
                    </Button>
                  </View>
                ) : (
                  <>
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
                      {rest > 0 ? (
                        <View style={styles.restContainer}>
                          <Text
                            style={{
                              ...styles.restLabel,
                              color: theme.colors.onBackground,
                            }}
                            variant="headlineMedium"
                          >
                            {restLabel}
                          </Text>
                          <Text
                            style={{
                              ...styles.restLabel,
                              color: theme.colors.primary,
                            }}
                            variant="headlineLarge"
                          >
                            {rest}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.modalGifContainer}>
                          {gifs && (
                            <Image
                              source={gifs![currentExercise]}
                              style={styles.gif}
                            />
                          )}
                          <View style={styles.dim} />
                          <View style={styles.exerciseInfoContainer}>
                            <Text
                              variant="headlineLarge"
                              style={{ ...styles.badgeText, color: "white" }}
                            >
                              {workout?.exercises &&
                                workout?.exercises[
                                  currentExercise
                                ].name.toUpperCase()}{" "}
                              X {workout?.exercises[currentExercise].reps}
                            </Text>
                            <View style={styles.setsBadge}>
                              <Text
                                variant="titleLarge"
                                style={styles.badgeText}
                              >
                                Set: {currentSet}/
                                {workout?.exercises &&
                                  workout?.exercises[currentExercise].sets}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                      <View style={styles.modalButtonsContainer}>
                        <Button
                          mode="contained"
                          style={styles.modalButton}
                          onPress={handleFinish}
                        >
                          <Text
                            variant="titleMedium"
                            style={{
                              ...styles.modalButtonText,
                              color: theme.colors.onPrimary,
                            }}
                          >
                            TAP WHEN DONE
                          </Text>
                        </Button>
                        <Button
                          mode="contained"
                          style={styles.modalButton}
                          onPress={handleSkip}
                        >
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
                  </>
                )}
              </Modal>
            </Portal>
          )}
      </View>
      {!status.deleting && status.error && (
        <Snackbar
          visible={status.error ? true : false}
          onDismiss={() =>
            setStatus((prevStatus) => {
              return { ...prevStatus, error: "" };
            })
          }
          style={{
            paddingRight: 10,
            backgroundColor: theme.colors.errorContainer,
          }}
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
      )}
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
    width: "100%",
  },
  setsBadge: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    elevation: 3,
  },
  exerciseInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    height: "auto",
    gap: 10,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    paddingHorizontal: 10,
    gap: 10,
  },
  startButton: {
    width: "100%",
    borderRadius: 10,
  },
  startButtonText: {
    fontFamily: "ProtestStrike",
  },
  restContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restLabel: {
    fontFamily: "ProtestStrike",
  },
  finishedContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 20,
  },
  timerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
