import { DifficultyBadgeProps } from "@/types/components/DifficultyBadge";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  // Rendering the badge based on the difficulty that's been passed
  return (
    <View
      style={{
        ...styles.difficultyBadge,
        backgroundColor:
          difficulty === 1
            ? "royalblue"
            : difficulty === 2
            ? "orange"
            : "orangered",
      }}
    >
      <Text
        variant="titleMedium"
        style={{ ...styles.difficultyText, color: "white" }}
      >
        {difficulty === 1
          ? "BEGINNER"
          : difficulty === 2
          ? "INTERMEDIATE"
          : "ADVANCED"}
      </Text>
    </View>
  );
}

export default DifficultyBadge;

// This is where all of the styles for this component reside
const styles = StyleSheet.create({
  difficultyBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  difficultyText: {
    fontFamily: "ProtestStrike",
  },
});
