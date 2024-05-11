import SelectableExercise from "@/components/SelectableExercise";
import SelectedExercise from "@/components/SelectedExercise";
import FunctionalHeader from "@/components/FunctionalHeader";
import RestPicker from "@/components/RestPicker";
import SetRepDialog from "@/components/SetRepDialog";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { ExerciseState } from "@/types/states/Exercise";
import { WorkoutPlan } from "@/types/states/Plan";
import { router, usePathname } from "expo-router";
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  Portal,
  Modal,
  Dialog,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PromptDialog from "@/components/PromptDialog";

const EditWorkout = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [unsavedChangesDialog, setUnsavedChangesDialog] = useState(false);
  const [status, setStatus] = useState({
    isLoading: true,
    error: ""
  })
  const path = usePathname();
  const workoutId = path.split("/").pop()!;

  const [selectedExercise, setSelectedExercise] = useState<ExerciseState>();
  const [availableExercises, setAvailableExercises] = useState<ExerciseState[]>(
    []
  );
  const [currentOrder, setCurrentOrder] = useState<number>(1);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const [plan, setPlan] = useState<WorkoutPlan>({
    title: "",
    difficulty: 1,
    setRest: 30,
    exerciseRest: 30,
    exercises: [],
  });

  useEffect(() => {

    const fetchUserWorkout = async () => {
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

                const selectedWorkout = {
                  title: workoutData.title,
                  difficulty: workoutData.difficulty,
                  setRest: workoutData.setRest,
                  exerciseRest: workoutData.exerciseRest,
                  exercises: workoutData.exercises,
                };

                setPlan(selectedWorkout)
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

    const fetchExercises = async () => {
      try {
        const exercisesRef = collection(FIREBASE_DB, "exercises");
        const snapshot = await getDocs(exercisesRef);
        const exercisesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          imageURL: doc.data().imageURL,
          videoURL: doc.data().videoURL,
          target: doc.data().target,
        }));

        setAvailableExercises(exercisesData);
      } catch (error) {
        setStatus((prevStatus) => {
          return { ...prevStatus, error: `COULD NOT FETCH EXERCISES: ${error}`};
        });
      }
    };

    fetchUserWorkout();
    fetchExercises();
  }, []);

  

  const handleTitleChange = (text: string) => {
    setPlan({ ...plan, title: text });
  };

  const handleSetRepChange = (type: string, value: string | undefined) => {
    if (value) {
      value = value.replace(/[^0-9]/g, "");
      type === "reps" ? setReps(value) : setSets(value);
    } else {
      type === "reps" ? setReps("") : setSets("");
    }
  };

  const handleSelectExercise = (data: ExerciseState) => {
    setDialogVisible(true);
    setSelectedExercise(data);
  };

  const handleRemove = (order: number) => {
    const filteredExercises = plan.exercises.filter(exercise => exercise.order !== order);
    filteredExercises.forEach(exercise => {
      if (exercise.order! > order) {
        exercise.order! -= 1;
      }
    });
    setCurrentOrder(prevOrder => prevOrder - 1);

    setPlan({ ...plan, exercises: filteredExercises });
  }

  const addExercise = () => {
    if (selectedExercise && sets && reps) {
      setPlan({
        ...plan,
        exercises: [
          ...plan.exercises,
          {
            ...selectedExercise,
            order: currentOrder,
            sets: parseInt(sets),
            reps: parseInt(reps),
          },
        ],
      });
      setSets("");
      setReps("");
      setDialogVisible(false);
      setModalVisible(false);
      setCurrentOrder((prevOrder) => prevOrder + 1);
    }
  };

  const handleSave = async () => {
    try {
      const currentUser = FIREBASE_AUTH.currentUser;
  
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = doc(FIREBASE_DB, "users", uid);
  
        // Check user existence before updating workout
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          setStatus((prevStatus) => {
            return { ...prevStatus, error: `USER NOT FOUND` };
          });
          return;
        }
  
        if (!workoutId) {
          setStatus((prevStatus) => {
            return { ...prevStatus, error: `WORKOUT ID MISSING` };
          });
          return;
        }
  
        const workoutRef = doc(userRef, "workouts", workoutId);
  
        await setDoc(workoutRef, plan);
  
        router.back();
      }
    } catch (error) {
      setStatus((prevStatus) => {
        return { ...prevStatus, error: `COULD NOT UPDATE WORKOUT: ${error}` };
      });
    }
  };

  const data = [
    { label: "BEGINNER", value: "1" },
    { label: "INTERMEDIATE", value: "2" },
    { label: "ADVANCED", value: "3" },
  ];

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
      <FunctionalHeader
        title=""
        onSave={handleSave}
        onBack={() => setUnsavedChangesDialog(true)}
      />
      
      <PromptDialog
        visible={unsavedChangesDialog}
        title="You have unsaved changes!"
        content="Are you sure you want to discard your changes?"
        onConfirm={() => router.back()}
        onCancel={() => setUnsavedChangesDialog(false)}
        theme={theme}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          CREATE WORKOUT PLAN
        </Text>
        <TextInput
          value={plan.title}
          contentStyle={styles.textInput}
          placeholder="Title"
          underlineColor={theme.colors.primary}
          activeUnderlineColor={theme.colors.primary}
          maxLength={32}
          onChangeText={(text) => handleTitleChange(text)}
        />

        <Dropdown
          style={[styles.dropdown, { borderColor: theme.colors.primary }]}
          placeholderStyle={{
            ...styles.placeholderStyle,
            color: theme.colors.primary,
          }}
          selectedTextStyle={{
            ...styles.selectedTextStyle,
            color: theme.colors.primary,
          }}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          containerStyle={{
            ...styles.dropdownContainer,
            backgroundColor: theme.colors.surface,
          }}
          itemTextStyle={{
            ...styles.dropdownItem,
            color: theme.colors.primary,
          }}
          placeholder={!isFocus ? "Select Difficulty" : "..."}
          searchPlaceholder="Search..."
          value={plan.difficulty.toString()}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setPlan({ ...plan, difficulty: parseInt(item.value) });
            setIsFocus(false);
          }}
        />

        <View style={styles.group}>
          <Text variant="titleMedium" style={styles.subTitle}>
            REST BETWEEN SETS
          </Text>
          <RestPicker
            value={plan.exerciseRest.toString()}
            onValueChange={(value) =>
              setPlan({ ...plan, exerciseRest: parseInt(value.toString()) })
            }
            theme={theme}
          />
        </View>
        <View style={styles.group}>
          <Text variant="titleMedium" style={styles.subTitle}>
            REST BETWEEN EXERCISES
          </Text>
          <RestPicker
            value={plan.setRest.toString()}
            onValueChange={(value) =>
              setPlan({ ...plan, setRest: parseInt(value.toString()) })
            }
            theme={theme}
          />
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setModalVisible(true)}
        >
          <Text
            variant="titleMedium"
            style={{ ...styles.buttonText, color: theme.colors.onPrimary }}
          >
            ADD EXERCISE
          </Text>
        </Button>
        <View style={styles.group}>
          {plan.exercises.map((exercise) => (
            <SelectedExercise
              key={exercise.order}
              name={exercise.name}
              information={`${exercise.sets}x${exercise.reps}`}
              order={exercise.order!}
              imageURL={exercise.imageURL}
              onRemove={(order) => handleRemove(order)}
              theme={theme}
            />
          ))}
        </View>

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
            </View>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              {availableExercises.map((exercise) => (
                <SelectableExercise
                  key={exercise.id}
                  data={exercise}
                  name={exercise.name}
                  onPress={(data) => handleSelectExercise(data)}
                  theme={theme}
                />
              ))}
            </ScrollView>
          </Modal>
        </Portal>
        <SetRepDialog
          visible={dialogVisible}
          sets={sets}
          reps={reps}
          onCancel={() => setDialogVisible(false)}
          onChange={handleSetRepChange}
          onConfirm={addExercise}
          theme={theme}
        />
      </ScrollView>
      {status.error && (
        <Snackbar
        visible={status.error ? true : false}
        onDismiss={() =>
          setStatus((prevStatus) => {
            return { ...prevStatus, error: ""};
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
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  modal: {
    justifyContent: "flex-start",
    flex: 1,
    height: "100%",
  },
  modalScroll: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    flexWrap: "wrap",
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 60,
    padding: 10,
  },
  dialogContentContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dialogInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  subTitle: {
    fontFamily: "ProtestStrike",
  },
  container: {
    flexDirection: "column",
    gap: 30,
    padding: 20,
  },
  group: {
    flexDirection: "column",
    gap: 10,
  },
  formContainer: {
    flexDirection: "column",
    gap: 30,
  },
  textInput: {
    fontFamily: "ProtestStrike",
    fontSize: 20,
  },
  dropdown: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    borderRadius: 10,
    borderWidth: 0,
    elevation: 3,
  },
  dropdownItem: {
    fontSize: 18,
    fontFamily: "ProtestStrike",
  },
  button: {
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "ProtestStrike",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 20,
    fontFamily: "ProtestStrike",
  },
  selectedTextStyle: {
    fontSize: 20,
    fontFamily: "ProtestStrike",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
  },
  segmentedButtons: {
    width: 30,
    borderWidth: 2,
  },
  segmentedButtonsLabel: {
    fontFamily: "ProtestStrike",
    fontSize: 16,
  },
});

export default EditWorkout;
