import { PickerDialogProps } from "@/types/components/PickerDialog";
import { UnsavedChangesDialogProps } from "@/types/components/UnsavedChanges";
import { useState } from "react";
import { TextInput, Button, Dialog, Portal, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function WeightHeightDateOfBirthDialog({
  value,
  visible,
  onChange,
  onConfirm,
  onCancel,
  theme,
  type, // weight, height, or dateOfBirth
} : PickerDialogProps) {

  const unit = type === "weight" ? "kg" : type === "height" ? "cm" : "";
  const label = `${type.charAt(0).toUpperCase() + type.slice(1)} ${unit}`;

  return (
    <Portal>
      <Dialog style={{backgroundColor: theme.colors.surface}} visible={visible} onDismiss={onCancel}>
        <Dialog.Title><Text variant="titleLarge">Enter your {type == "height" ? "height" : "weight" }</Text></Dialog.Title>
        <Dialog.Content>
            <TextInput
              style={{backgroundColor: theme.colors.surface}}
              label={label}
              value={value}
              right={<Text variant="titleSmall">kg</Text>}
              onChangeText={onChange}
              keyboardType={type === "weight" ? "numeric" : "default"}
              maxLength={type === "weight" ? 3 : type === "height" ? 4 : 0} // Adjust max length
            />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel} textColor="red">
            CANCEL
          </Button>
          <Button onPress={onConfirm} textColor={theme.colors.primary}>
            CONFIRM
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}


const styles = StyleSheet.create({
  
})