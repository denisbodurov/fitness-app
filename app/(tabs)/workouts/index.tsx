import CustomPlan from "@/components/CustomPlan";
import Icon from "@/components/Icon";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { WorkoutPlan } from "@/types/states/Plan";
import { isLoading } from "expo-font";
import { Link, useNavigation } from "expo-router";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, ActivityIndicator, Searchbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState({
    isLoading: true,
    noWorkouts: false,
    error: "",
  });

  useEffect(() => {
    const fetchUserWorkouts = async () => {

      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid);

          // Get a reference to the workouts subcollection
          const workoutsRef = collection(userRef, "workouts");
          
          // Listen for real-time updates on the workouts subcollection
          const unsubscribe = onSnapshot(workoutsRef, (querySnapshot) => {
            const fetchedWorkouts: WorkoutPlan[] = []; // Use the interface for type
              querySnapshot.forEach((doc) => {
                const workoutData = doc.data();
                fetchedWorkouts.push({
                  id: doc.id,
                  title: workoutData.title,
                  difficulty: workoutData.difficulty,
                  setRest: workoutData.setRest,
                  exerciseRest: workoutData.exerciseRest,
                  exercises: workoutData.exercises,
                });
              });

            if (fetchedWorkouts.length === 0) {
              setStatus((prevStatus) => {
                return { ...prevStatus, noWorkouts: true};
              });
            } else {
              setStatus((prevStatus) => {
                return { ...prevStatus, noWorkouts: false};
              });
              setWorkouts(fetchedWorkouts);
              setFilteredWorkouts(fetchedWorkouts);
            }
    
          });

          return () => unsubscribe(); // Unsubscribe when component unmounts
        } else {
          setStatus((prevStatus) => {
            return { ...prevStatus, error: "NO AUTH SESSION FOUND"};
          });
        }
      } catch (error) {
        setStatus((prevStatus) => {
          return { ...prevStatus, error: `COULD NOT FETCH WORKOS: ${error}`};
        });
      } finally {
        setStatus((prevStatus) => {
          return { ...prevStatus, isLoading: false };
        });
      }
    };

    fetchUserWorkouts();
  }, []); // Empty dependency array ensures useEffect runs only once
  

  const applyFilter = () => {
    if (searchQuery === "") {
      setFilteredWorkouts(workouts); // Show all workouts if search is empty
      return;
    }

    const filtered = workouts.filter((workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredWorkouts(filtered);
  };

  // Handle search query changes and trigger filtering
  useEffect(() => {
    const timeoutId = setTimeout(applyFilter, 500); // Debounce for smoother experience

    return () => clearTimeout(timeoutId); // Clear timeout when unmounted or search changes
  }, [searchQuery, workouts]); // Dependency array: update on searchQuery change

  const renderContent = () => {

    if (status.isLoading) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    }

    if (status.error) {
      return (
        <View style={styles.statusContainer}>
          <Text variant="headlineLarge" style={styles.text}>SOMETHING WENT WRONG</Text>
        </View>
      );
    }

    if(status.noWorkouts) {
      return (
      <View style={styles.statusContainer}>
        <Text variant="headlineMedium" style={{...styles.text, color: theme.colors.outline}}>NO WORKOUT PLANS YET</Text>
      </View>
      )
    }
    

    if(filteredWorkouts) {
      return (
        <ScrollView>
        {filteredWorkouts.map((workout, index) => {
          return (
            <CustomPlan
              key={index}
              id={workout.id!}
              title={workout.title}
              information={workout.exercises.length}
              difficulty={workout.difficulty}
              theme={theme}
            />
          );
        })}
      </ScrollView>
      )
    }
  }

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
      <View style={styles.header}>
        <Searchbar
          style={{ ...styles.searchbar, backgroundColor: theme.colors.surface }}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          elevation={2}
        />
        <Link asChild href="/(tabs)/workouts/create-workout">
          <TouchableOpacity>
            <Icon
              library="Feather"
              name="plus-circle"
              size={30}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </Link>
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  searchbar: {
    width: "90%",
  },
  statusContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",  
  },
  text: {
    fontFamily: "ProtestStrike",
  }
});
