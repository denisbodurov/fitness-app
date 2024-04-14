import Exercise from "@/components/Exercise";
import FunctionalHeader from "@/components/FunctionalHeader";
import RestPicker from "@/components/RestPicker";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const WorkoutForm = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [plan, setPlan] = useState({
    title: "",
    difficulty: 1,
    repRest: "",
    setRest: "",
    exercises: [],
  });

  const handleTitleChange = (text: string) => {
    setTitle(text);
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
        onSave={() => console.log("Saved")}
        onBack={() => console.log("YAy")}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          CREATE WORKOUT PLAN
        </Text>
        <TextInput
          value={title}
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
            REST BETWEEN REPS
          </Text>
          <RestPicker
            value={plan.repRest}
            onValueChange={(value) =>
              setPlan({ ...plan, repRest: value.toString() })
            }
            theme={theme}
          />
        </View>
        <View style={styles.group}>
          <Text variant="titleMedium" style={styles.subTitle}>
            REST BETWEEN EXERCISES
          </Text>
          <RestPicker
            value={plan.setRest}
            onValueChange={(value) =>
              setPlan({ ...plan, setRest: value.toString() })
            }
            theme={theme}
          />
        </View>
        <Button style={styles.button} mode="contained">
          <Text
            variant="titleMedium"
            style={{ ...styles.buttonText, color: theme.colors.onPrimary }}
          >
            ADD EXERCISE
          </Text>
        </Button>
        <View style={styles.group}>
          <Exercise />
          <Exercise />
          <Exercise />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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

export default WorkoutForm;
