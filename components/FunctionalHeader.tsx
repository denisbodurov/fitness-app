// Header.js
import { FunctionalHeaderProps } from "@/types/components/FunctionalHeader";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton, Button, useTheme } from "react-native-paper";

function FunctionalHeader({ title, onSave, onBack } : FunctionalHeaderProps) {
  const theme = useTheme();

  return (
    <View style={{ ...styles.header, backgroundColor: theme.colors.surface }}>
      <View style={styles.leftContainer}>
        <IconButton
          icon="arrow-left"
          size={30}
          iconColor={theme.colors.onSurface}
          rippleColor={"rgba(125,125,125,0.2)"}
          onPress={onBack}
        />
      </View>
      <Text variant="titleLarge" style={styles.headerTitle}>
        {title}
      </Text>
      <View style={styles.rightContainer}>
        <Button
          icon="content-save"
          mode="text"
          onPress={onSave}
          labelStyle={styles.buttonTitle}
        >
          SAVE
        </Button>
      </View>
    </View>
  );
}

// This is where all of the styles for this component reside
const styles = StyleSheet.create({
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

export default FunctionalHeader;
