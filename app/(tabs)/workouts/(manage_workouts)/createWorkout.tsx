import Exercise from "@/components/Exercise";
import FunctionalHeader from "@/components/FunctionalHeader";
import RestPicker from "@/components/RestPicker";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutForm = () => {
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const data = [
    { label: "BEGINNER", value: "beginner" },
    { label: "INTERMEDIATE", value: "intermediate" },
    { label: "ADVANCED", value: "advanced" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
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
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        
        <View style={styles.group}>
          <Text variant="titleMedium" style={styles.subTitle}>REST BETWEEN REPS</Text>
          <RestPicker value={value} onValueChange={setValue} theme={theme}/>
        </View>
        <View style={styles.group}>
          <Text variant="titleMedium" style={styles.subTitle}>REST BETWEEN EXERCISES</Text>
          <RestPicker value={value} onValueChange={setValue} theme={theme}/>
        </View>
        <Button style={styles.button} mode="contained">
          ADD WORKOUT
        </Button>
        <View style={styles.group}>
          <Exercise/>
          <Exercise/>
          <Exercise/>
        </View>
        
      </ScrollView>
    </SafeAreaView>
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
    fontFamily: "ProtestStrike"
  },
  container: {
    flexDirection: "column",
    gap: 30,
    padding: 20,
  },
  group: {
    flexDirection: "column",
    gap: 10
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
