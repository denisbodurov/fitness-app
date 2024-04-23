import FunctionalHeader from "@/components/FunctionalHeader";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import defaultSchedule from "@/constants/defaultSchedule";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { ScheduleData } from "@/types/components/Schedule";
import { router } from "expo-router";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import {
  useTheme,
  List,
  Switch,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function EditScheduleScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [status, setStatus] = useState({
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          const uid = currentUser.uid;

          const usersRef = collection(FIREBASE_DB, "users");

          const userDoc = doc(usersRef, uid);

          const userDocSnapshot = await getDoc(userDoc);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            setSchedule({
              ...userData.schedule,
            });
          } else {
            setStatus({ ...status, error: "RESOURCE NOT FOUND" });
          }
        } else {
          setStatus({ ...status, error: "AUTH SESSION NOT FOUND" });
        }
      } catch (error) {
        setStatus({ ...status, error: `FAILED FETCHING DATA: ${error}` });
      } finally {
        setStatus((prevStatus) => {
          return { ...prevStatus, isLoading: false };
        });
      }
    };

    fetchSchedule();
  }, []);

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
    setHasChanged(true);
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

  const handleSave = async () => {
    setStatus({ ...status, isLoading: true });
    try {
      const currentUser = FIREBASE_AUTH.currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        const usersRef = collection(FIREBASE_DB, "users");
        const userDoc = doc(usersRef, uid);
        const updateData = {
          schedule: schedule,
        };

        await updateDoc(userDoc, updateData);
        setHasChanged(false);
      } else {
        setStatus({ ...status, error: "AUTH SESSION NOT FOUND" });
      }
    } catch (error) {
      setStatus({ ...status, error: `REQUEST FAILED: ${error}` });
    } finally {
      setStatus((prevStatus) => {
        return { ...prevStatus, isLoading: false };
      });
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
      <FunctionalHeader
        title="Settings"
        onSave={handleSave}
        onBack={() => (hasChanged ? showDialogue() : router.back())}
      />
      <PaperProvider>
        <UnsavedChangesDialog
          visible={isDialogVisible}
          onStay={handleStay}
          onDismiss={handleDismiss}
          theme={theme}
        />
        <List.Section style={styles.container}>
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
              Rest
            </List.Subheader>
          </View>

          {status.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <List.Item
                style={{
                  ...styles.listItem,
                  borderBottomColor: theme.colors.outline,
                }}
                titleStyle={styles.listItemTitle}
                title="Monday"
                right={() => (
                  <Switch
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
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
                    color={theme.colors.primary}
                    value={schedule.sunday.rest}
                    onValueChange={() => onToggleSwitch(7)}
                  />
                )}
              />
            </ScrollView>
          )}
        </List.Section>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 0,
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
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditScheduleScreen;
