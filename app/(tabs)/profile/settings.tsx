import Icon from "@/components/Icon";
import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  IconButton,
  Button,
  useTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PickerDialog from "@/components/PickerDialog";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

function SettingsScreen() {
  const theme = useTheme();
  const [value, setValue] = React.useState("");
  const [dialogStates, setDialogStates] = useState({
    weightDialog: false,
    heightDialog: false,
    dateOfBirthDialog: false,
    backActionDialog: false,
  });
  const [settings, setSettings] = useState({
    dateOfBirth: "",
    weight: "",
    height: "",
  });

  const showDialogue = (dialogType: string) => {
    setDialogStates((prevStates) => ({
      ...prevStates,
      [dialogType]: true,
    }));
  };

  const handleStay = (dialogType: string) => {
    setDialogStates((prevStates) => ({
      ...prevStates,
      [dialogType]: false,
    }));
  };

  const handleDismiss = (dialogType: string) => {
    setDialogStates((prevStates) => {
      if (dialogType === "backActionDialog") {
        router.back();
      }
      return { ...prevStates, [dialogType]: false };
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={{ ...styles.header, backgroundColor: theme.colors.surface }}>
        <View style={styles.leftContainer}>
          <IconButton
            icon="arrow-left"
            size={30}
            iconColor={theme.colors.onSurface}
            rippleColor={"rgba(125,125,125,0.2)"}
            onPress={() => showDialogue("backActionDialog")}
          />
        </View>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Settings
        </Text>
        <View style={styles.rightContainer}>
          <Button
            icon="content-save"
            mode="text"
            onPress={() => console.log("Pressed")}
            labelStyle={styles.buttonTitle}
          >
            SAVE
          </Button>
        </View>
      </View>
      <UnsavedChangesDialog
        visible={dialogStates.backActionDialog}
        onStay={() => handleStay("backActionDialog")}
        onDismiss={() => handleDismiss("backActionDialog")}
        theme={theme}
      />
      <PickerDialog
        visible={dialogStates.heightDialog}
        onConfirm={() => handleStay("heightDialog")}
        onCancel={() => handleDismiss("heightDialog")}
        type="height"
        theme={theme}
      />
      <PickerDialog
        visible={dialogStates.weightDialog}
        onConfirm={() => handleStay("weightDialog")}
        onCancel={() => handleDismiss("weightDialog")}
        type="weight"
        theme={theme}
      />
      {dialogStates.dateOfBirthDialog && (
        <DateTimePicker
          mode="date"
          display="spinner"
          maximumDate={new Date()}
          onChange={(event) =>
            event.type === "set"
              ? handleStay("dateOfBirthDialog")
              : handleDismiss("dateOfBirthDialog")
          }
          value={new Date()}
          key={theme.colors.surface}
          positiveButton={{ textColor: theme.colors.primary }}
          negativeButton={{ textColor: "red" }}
        />
      )}

      <View style={styles.listContainer}>
        {/* Height */}
        <View style={styles.listItem}>
          <View style={styles.listItemGroup}>
            <Icon
              library="MaterialCommunityIcons"
              name="human-male-height"
              color={theme.colors.outline}
            />
            <Text>Height:</Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.selectField,
              borderColor: theme.colors.outline,
            }}
            activeOpacity={0.8}
            onPress={() => showDialogue("heightDialog")}
          >
            <Text variant="titleMedium">183cm</Text>
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
            <Text>Weight:</Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.selectField,
              borderColor: theme.colors.outline,
            }}
            activeOpacity={0.8}
            onPress={() => showDialogue("weightDialog")}
          >
            <Text variant="titleMedium">67kg</Text>
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
            <Text>Date of Birth</Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.selectField,
              borderColor: theme.colors.outline,
            }}
            activeOpacity={0.8}
            onPress={() => showDialogue("dateOfBirthDialog")}
          >
            <Text variant="titleMedium">01/27/2005</Text>
            <Icon
              library="Entypo"
              name="triangle-down"
              color={theme.colors.outline}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  headerTitle: {
    fontFamily: "ProtestStrike",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    alignItems: "center",
    fontSize: 18,
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
    borderRadius: 25,
    borderWidth: 1,
  },
  separator: {
    borderBottomWidth: 2,
    width: "100%",
  },
});

export default SettingsScreen;
