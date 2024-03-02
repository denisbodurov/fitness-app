import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutList from "@/components/WorkoutList";
import Schedule from "@/components/Schedule";
import { ScheduleData } from "@/types/components/Schedule";
import defaultSchedule from "@/constants/defaultSchedule";
import Progress from "@/components/Progress";

export default function HomeScreen() {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);
  const [defaultWorkouts, setDefaultWorkouts] = useState("");
  const [dailyProgress, setDailyProgress] = useState();

  const theme = useTheme();

  const mockData = [
    {
      bannerURL: "test.com",
      title: "ARMS WORKOUT",
      information: "16 EXERCISES - 12 MINUTES",
      difficulty: 1,
      id: 1,
    },
    {
      bannerURL: "test.com",
      title: "LEGS WORKOUT",
      information: "6 EXERCISES - 9 MINUTES",
      difficulty: 2,
      id: 2,
    },
    {
      bannerURL: "test.com",
      title: "ABS WORKOUT",
      information: "12 EXERCISES - 11 MINUTES",
      difficulty: 3,
      id: 3,
    },
  ];

  const mockStats = {
    workouts: 12,
    calories: 1204,
    minutes: 120
  }

  useEffect(() => {
    try {
      //Try to fetch data
    } catch {
      //Catch thrown errors and set default data
      setSchedule(defaultSchedule);
    }
  }, []);

  return (
    //Wrapping the home screen in safe area view
    <SafeAreaView style={style.safeArea}>
      {/* ScrollView that contains all of the home screen elements */}
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
            <Progress data={mockStats} theme={theme}/>
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
    </SafeAreaView>
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
