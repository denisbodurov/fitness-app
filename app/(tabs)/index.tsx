import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DataBlock from "@/components/DataBlock";
import WorkoutList from "@/components/WorkoutList";
import Schedule from "@/components/Schedule";
import { ScheduleDataType } from "@/types/components/Schedule";
import defaultSchedule from "@/constants/defaultSchedule";


export default function HomeScreen() {
  const [schedule, setSchedule] = useState<ScheduleDataType>(defaultSchedule);
  const [defaultWorkouts, setDefaultWorkouts] = useState('');
  const [dailyProgress, setDailyProgress] = useState();

  const theme = useTheme();


  useEffect(() => {
    try {
      //Try to fetch data
    } catch {
      //Catch thrown errors and set default data
      setSchedule(defaultSchedule)
    }
  }, [])

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView contentContainerStyle={{...style.body, backgroundColor: theme.colors.background}}>
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

          <View style={{...style.progressContainer, backgroundColor: theme.colors.surface}}>
            <DataBlock value={0} suffix={"WORKOUTS"} theme={theme} />
            <DataBlock value={630} suffix={"CAL"} theme={theme} />
            <DataBlock value={72} suffix={"MINUTES"} theme={theme} />
          </View>
        </View>
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
          <Schedule scheduleData={schedule} theme={theme}/>
        </View>
        <View style={style.section}>
          <View style={style.sectionTitleContainer}>
            <Text style={style.sectionTitle} variant="headlineSmall">
              BEGINNER
            </Text>
          </View>
          <WorkoutList />
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