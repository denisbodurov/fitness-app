import { Settings } from "@/types/components/Settings";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Switch,
  TextInput,
  Title,
  IconButton,
  Button,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>({
    units: "metric", // Initial unit preference
    dateOfBirth: "",
    weight: 0,
    height: 0,
    gender: "",
  });

  const theme = useTheme();

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
            onPress={() => router.back()}
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
});

export default SettingsScreen;
