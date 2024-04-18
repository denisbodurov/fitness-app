import CustomPlan from "@/components/CustomPlan";
import Icon from "@/components/Icon";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { WorkoutPlan } from "@/types/states/Plan";
import { Link, useNavigation } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(FIREBASE_DB, "users", uid);

          // Listen for real-time updates on the user document
          const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const userWorkouts = userData.workouts || [];
              setWorkouts(userWorkouts);
              console.log(userWorkouts[1]);
              console.log("Updated user workouts:", userWorkouts);
              // Use the updated workouts data here
            } else {
              console.log("No user document found");
              setWorkouts([]);
            }
          });

          return () => unsubscribe(); // Unsubscribe when component unmounts
        }
      } catch (error) {
        console.error("Error fetching user workouts:", error);
      }
    };

    fetchUserWorkouts();
  }, []); // Empty dependency array ensures useEffect runs only once

  const mockData = [
    {
      title: "ARMS WORKOUT",
      information: "16 EXERCISES - 12 MINUTES",
      difficulty: 1,
      id: 1,
    },
    {
      title: "LEGS WORKOUT",
      information: "6 EXERCISES - 9 MINUTES",
      difficulty: 2,
      id: 2,
    },
    {
      title: "ABS WORKOUT",
      information: "12 EXERCISES - 11 MINUTES",
      difficulty: 3,
      id: 3,
    },
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
      <ScrollView>
        {workouts.map((workout, index) => {
          return (
            <CustomPlan
              key={index}
              id={index}
              title={workout.title}
              information={workout.exercises.length}
              difficulty={workout.difficulty}
              theme={theme}
            />
          );
        })}
      </ScrollView>
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
});
