import FunctionalHeader from "@/components/FunctionalHeader";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import defaultSchedule from "@/constants/defaultSchedule";
import { ScheduleData } from "@/types/components/Schedule";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  useTheme,
  List,
  Switch,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function EditScheduleScreen() {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const showDialogue = () => {
    setIsDialogVisible(true);
  };

  const handleStay = () => {
    setIsDialogVisible(false);
  };

  const handleDismiss = () => {
    router.back();
  };

  const onToggleSwitch = (day: number) => {
    const dayMap: { [key: number]: keyof typeof schedule } = {
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
      7: "sunday",
    };

    const dayKey = dayMap[day];
    if (dayKey) {
      setSchedule((prev) => ({
        ...prev,
        [dayKey]: {
          rest: !prev[dayKey].rest,
        },
      }));
    }
  };

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FunctionalHeader title="Settings" onSave={() => console.log("Saved")} onBack={() => showDialogue()}/>
      <PaperProvider>
        <UnsavedChangesDialog
          visible={isDialogVisible}
          onStay={handleStay}
          onDismiss={handleDismiss}
          theme={theme}
        />
        <List.Section>
          <View
            style={{
              ...styles.listTitleContainer,
              borderBottomColor: theme.colors.onBackground,
            }}
          >
            <List.Subheader
              style={{ ...styles.listTitle, color: theme.colors.onBackground }}
            >
              Days of the week
            </List.Subheader>
            <List.Subheader
              style={{ ...styles.listTitle, color: theme.colors.onBackground }}
            >
              Workout Day
            </List.Subheader>
          </View>

          <ScrollView>
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Monday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.monday.rest}
                  onValueChange={() => onToggleSwitch(1)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Tuesday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.tuesday.rest}
                  onValueChange={() => onToggleSwitch(2)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Wednesday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.wednesday.rest}
                  onValueChange={() => onToggleSwitch(3)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Thursday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.thursday.rest}
                  onValueChange={() => onToggleSwitch(4)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Friday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.friday.rest}
                  onValueChange={() => onToggleSwitch(5)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Saturday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.saturday.rest}
                  onValueChange={() => onToggleSwitch(6)}
                />
              )}
            />
            <List.Item
              style={{
                ...styles.listItem,
                borderBottomColor: theme.colors.outline,
              }}
              titleStyle={styles.listItemTitle}
              title="Sunday"
              right={() => (
                <Switch
                  style={{}}
                  value={schedule.sunday.rest}
                  onValueChange={() => onToggleSwitch(7)}
                />
              )}
            />
          </ScrollView>
        </List.Section>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
  },
  listTitle: {
    fontFamily: "ProtestStrike",
    fontSize: 16,
  },
  listItem: {
    width: "100%",
    borderBottomWidth: 2,
    paddingHorizontal: 15,
  },
  listItemTitle: {
    fontFamily: "ProtestStrike",
    fontSize: 24,
  },
});

export default EditScheduleScreen;
