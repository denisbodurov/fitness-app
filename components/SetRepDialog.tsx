import { TextInput, Button, Dialog, Portal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SetRepDialogProps } from "@/types/components/SetRepDialog";

export default function SetRepDialog({
  visible,
  sets,
  reps,
  onChange,
  onConfirm,
  onCancel,
  theme,
}: SetRepDialogProps) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        style={{ backgroundColor: theme.colors.surface }}
        onDismiss={onCancel}
      >
        <Dialog.Content>
          <View style={styles.dialogContentContainer}>
            <View style={styles.dialogInputContainer}>
              <Text variant="titleMedium">SETS: </Text>
              <TextInput
                value={sets}
                onChangeText={(text) => onChange("sets", text)}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.dialogInputContainer}>
              <Text variant="titleMedium">REPS: </Text>
              <TextInput
                value={reps}
                onChangeText={(text) => onChange("reps", text)}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContentContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dialogInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
