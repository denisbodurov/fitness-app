import Icon from "@/components/Icon";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { router } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import {
  Text,
  useTheme,
  ActivityIndicator,
  Snackbar,
  Button,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PickerDialog from "@/components/PickerDialog";
import { DatePickerModal } from "react-native-paper-dates";
import FunctionalHeader from "@/components/FunctionalHeader";
import { en, registerTranslation } from "react-native-paper-dates";
import { Settings } from "@/types/states/Settings";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebase from "@/utils/hooks/useFirebase";

registerTranslation("en", en);

function SettingsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { signOut } = useFirebase();

  const [dialogStates, setDialogStates] = useState({
    weightDialog: false,
    heightDialog: false,
    dateOfBirthDialog: false,
    backActionDialog: false,
  });

  const [initialSettings, setInitialSettings] = useState<Settings>({
    dateOfBirth: new Date(),
    weight: "",
    height: "",
  });

  const [settings, setSettings] = useState(initialSettings);

  const [hasChanged, setHasChanged] = useState(false);

  const [status, setStatus] = useState({
    isLoading: true,
    error: "",
  });

  //Fetch the data for weight, height and DOB of the current user from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current user
        const currentUser = FIREBASE_AUTH.currentUser;

        if (currentUser) {
          // Get the UID of the current user
          const uid = currentUser.uid;

          // Reference to the users collection
          const usersRef = collection(FIREBASE_DB, "users");

          // Query for the current user's document
          const userDoc = doc(usersRef, uid);

          // Fetch the document snapshot
          const userDocSnapshot = await getDoc(userDoc);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            setInitialSettings({
              dateOfBirth: userData.dob.toDate(),
              weight: userData.weight.toString(),
              height: userData.height.toString(),
            });
            setSettings(initialSettings)
          } else {
            setStatus({ ...status, error: "RESOURCE NOT FOUND" });
          }
        } else {
          setStatus({ ...status, error: "NO AUTH SESSION FOUND" });
        }
      } catch (error) {
        setStatus({ ...status, error: `FAILED FETCHING DATA: ${error}` });
      } finally {
        setStatus((prevStatus) => {
          return { ...prevStatus, isLoading: false };
        });
      }
    };

    // Call the function to fetch user data when component mounts
    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  const showDialogue = (dialogType: string) => {
    setDialogStates((prevStates) => ({
      ...prevStates,
      [dialogType]: true,
    }));
  };

  const handleConfirm = (dialogType: string, settingType: keyof Settings) => {
    setDialogStates((prevStates) => ({
      ...prevStates,
      [dialogType]: false,
    }));
    setInitialSettings({
      ...initialSettings,
      [settingType]: settings[settingType],
    });
    setHasChanged(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleStay = () => {
    setDialogStates((prevStates) => ({
      ...prevStates,
      backActionDialog: false,
    }));
  };

  const handleDismiss = (dialogType: string) => {
    setDialogStates((prevStates) => {
      return { ...prevStates, [dialogType]: false };
    });
    setSettings(initialSettings);
  };

  const handleChange = (settingType: string, value: string | undefined) => {
    if (value) {
      value.replace(/[^0-9]/g, "");
      setSettings({ ...settings, [settingType]: value || "" });
    } else {
      setSettings({ ...settings, [settingType]: "" });
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
          height: parseInt(initialSettings.height),
          weight: parseInt(initialSettings.weight),
          dob: initialSettings.dateOfBirth,
        };

        await updateDoc(userDoc, updateData);
        console.log("Success");
        setHasChanged(false);
      }
    } catch {
      console.log("error");
    } finally {
      setStatus((prevStatus) => {
        return { ...prevStatus, isLoading: false };
      });
    }
  };

  const formattedDate = initialSettings.dateOfBirth.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const handleSignOut = () => {
    signOut()
    router.navigate('/(auth)/sign-in')
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
      {/* Header */}
      <FunctionalHeader
        title="Settings"
        onSave={() => handleSave()}
        onBack={() =>
          hasChanged ? showDialogue("backActionDialog") : router.back()
        }
      />

      <UnsavedChangesDialog
        visible={dialogStates.backActionDialog}
        onStay={() => handleStay()}
        onDismiss={() => handleBack()}
        theme={theme}
      />
      <PickerDialog
        visible={dialogStates.heightDialog}
        onConfirm={() => handleConfirm("heightDialog", "height")}
        value={settings.height}
        onChange={(value) => {
          handleChange("height", value);
        }}
        onCancel={() => handleDismiss("heightDialog")}
        type="height"
        theme={theme}
      />
      <PickerDialog
        visible={dialogStates.weightDialog}
        onConfirm={() => handleConfirm("weightDialog", "weight")}
        onCancel={() => handleDismiss("weightDialog")}
        value={settings.weight}
        onChange={(value) => {
          handleChange("weight", value);
        }}
        type="weight"
        theme={theme}
      />

      <DatePickerModal
        presentationStyle="overFullScreen"
        locale="en"
        mode="single"
        onChange={(value) => {
          if (value.date)
            setSettings({ ...settings, dateOfBirth: new Date(value.date) });
        }}
        visible={dialogStates.dateOfBirthDialog}
        onDismiss={() => handleDismiss("dateOfBirthDialog")}
        date={initialSettings.dateOfBirth}
        onConfirm={() => handleConfirm("dateOfBirthDialog", "dateOfBirth")}
      />

      {status.isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          {/* Height */}
          <View style={styles.listItem}>
            <View style={styles.listItemGroup}>
              <Icon
                library="MaterialCommunityIcons"
                name="human-male-height"
                color={theme.colors.outline}
              />
              <Text variant="titleMedium" style={styles.itemTitle}>
                HEIGHT
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.selectField,
                borderColor: theme.colors.outline,
              }}
              activeOpacity={0.8}
              onPress={() => showDialogue("heightDialog")}
            >
              <Text variant="titleMedium">
                {initialSettings.height || 0} cm
              </Text>
              <Icon
                library="Entypo"
                name="triangle-down"
                color={theme.colors.outline}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {/* Weight */}
          <View style={styles.listItem}>
            <View style={styles.listItemGroup}>
              <Icon
                library="MaterialCommunityIcons"
                name="weight"
                color={theme.colors.outline}
              />
              <Text variant="titleMedium" style={styles.itemTitle}>
                WEIGHT
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.selectField,
                borderColor: theme.colors.outline,
              }}
              activeOpacity={0.8}
              onPress={() => showDialogue("weightDialog")}
            >
              <Text variant="titleMedium">
                {initialSettings.weight || 0} kg
              </Text>
              <Icon
                library="Entypo"
                name="triangle-down"
                color={theme.colors.outline}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {/*Date of birth*/}
          <View style={styles.listItem}>
            <View style={styles.listItemGroup}>
              <Icon
                library="MaterialCommunityIcons"
                name="calendar"
                color={theme.colors.outline}
              />
              <Text variant="titleMedium" style={styles.itemTitle}>
                DATE OF BIRTH
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.selectField,
                borderColor: theme.colors.outline,
              }}
              activeOpacity={0.8}
              onPress={() => showDialogue("dateOfBirthDialog")}
            >
              <Text variant="titleMedium">{formattedDate}</Text>
              <Icon
                library="Entypo"
                name="triangle-down"
                color={theme.colors.outline}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Button
          style={{
            ...styles.logoutButton,
            backgroundColor: theme.colors.primary,
          }}
          mode="contained"
          onPress={handleSignOut}
        >
          <Text variant="titleMedium" style={{...styles.logoutText, color: theme.colors.onPrimary}}>
            SIGN OUT
          </Text>{" "}
        </Button>
        </View>
      )}

      {status.error && (
        <Snackbar
          visible={status.error ? true : false}
          onDismiss={() => setStatus( (prevStatus) => { return {...prevStatus, error: ""}})}
          style={{ backgroundColor: theme.colors.errorContainer }}
          duration={3000}
          action={{
            label: "DISMISS",
            labelStyle: {
              color: theme.colors.onBackground,
              fontFamily: "ProtestStrike"
            }
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onErrorContainer, fontFamily: "ProtestStrike" }}
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
  listContainer: {
    flexDirection: "column",
    gap: 20,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontFamily: "ProtestStrike",
  },
  listItemGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  segmentedButtons: {
    maxWidth: 200,
  },
  selectField: {
    minWidth: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  separator: {
    borderBottomWidth: 2,
    width: "100%",
  },
  loadingIndicator: {
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    width: "100%",
  },
  logoutText: {
    fontFamily: "ProtestStrike"
  },
});

export default SettingsScreen;
