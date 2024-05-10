import { SelectFieldProps } from "@/types/components/SelectFieldProps";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "./Icon";

export default function SelectField({
  value,
  onPress,
  theme,
}: SelectFieldProps) {
  return (
    <TouchableOpacity
      style={{
        ...styles.selectField,
        borderColor: theme.colors.outline,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text
        variant="titleMedium"
        style={{ ...styles.text, color: theme.colors.outline }}
      >
        {value}
      </Text>
      <Icon
        library="Entypo"
        name="triangle-down"
        color={theme.colors.outline}
        size={20}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectField: {
    minWidth: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
  },
  text: {
    fontFamily: "ProtestStrike",
  },
});
