import { router } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModalScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
        <Text
          variant="titleMedium"
          style={styles.headerTitle}
          numberOfLines={1}
        >
          Current Post
        </Text>
        <View style={styles.rightContainer} />
      </View>
    </View>
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
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: "ProtestStrike",
    textAlign: "center",
    flex: 1, // Take remaining space
  },
  rightContainer: {
    flex: 1, // Take remaining space
  },
});
