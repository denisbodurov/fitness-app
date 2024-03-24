import { router, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/components/Icon";

export default function WorkoutScreen() {
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
        <View style={styles.rightContainer}>
          <IconButton
            icon="trash-can"
            iconColor={theme.colors.primary}
            size={26}
            onPress={() => console.log("Pressed")}
          />
          <IconButton
            icon="square-edit-outline"
            iconColor={theme.colors.primary}
            size={26}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ ...styles.difficultyBadge, backgroundColor: "aqua" }}>
          <Text
            variant="titleMedium"
            style={{ ...styles.difficultyText, color: "black" }}
          >
            BEGINNER
          </Text>
        </View>
        <View style={styles.informationContainer}>
          <Text variant="headlineMedium" style={styles.workoutTitle}>
            NO NAME
          </Text>
          <View style={styles.informationItemContainer}>
            <Icon
              library="Feather"
              name="target"
              color={theme.colors.outline}
              size={24}
            />
            <Text
              variant="titleMedium"
              style={{ ...styles.difficultyText, color: theme.colors.outline }}
            >
              BUTTOCKS, CALVES, BICEPS, FOREARMS, CALVES, BICEPS,
            </Text>
          </View>
          <View style={styles.informationItemContainer}>
            <Icon
              library="MaterialCommunityIcons"
              name="dumbbell"
              color={theme.colors.outline}
              size={24}
            />
            <Text
              variant="titleMedium"
              style={{ ...styles.difficultyText, color: theme.colors.outline }}
            >
              10 EXERCISES
            </Text>
          </View>
          <View style={styles.informationItemContainer}>
            <Icon
              library="AntDesign"
              name="clockcircle"
              color={theme.colors.outline}
              size={24}
            />
            <Text
              variant="titleMedium"
              style={{ ...styles.difficultyText, color: theme.colors.outline }}
            >
              25 MINUTES
            </Text>
          </View>
        </View>
        <Button style={{...styles.startButton, backgroundColor: theme.colors.primary}}>
          <Text variant="titleMedium" style={{color: theme.colors.onPrimary}}>START WORKOUT</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 25,
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    alignItems: "center",
    fontSize: 18,
  },
  difficultyBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  difficultyText: {
    fontFamily: "ProtestStrike",
  },
  informationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  workoutTitle: {
    fontFamily: "ProtestStrike",
  },
  informationItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  startButton: {
    width: "100%",
    paddingVertical: 5,
    borderRadius: 10,
  }
});
