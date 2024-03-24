import { UnsavedChangesDialogProps } from "@/types/components/UnsavedChanges";
import { Button, Dialog, Portal, Text } from "react-native-paper";


export default function UnsavedChangesDialog({visible, onStay, onDismiss, theme} : UnsavedChangesDialogProps) {

    return (
        <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title><Text variant="titleLarge">You have unsaved changes!</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant="titleSmall">Are you sure you want to discard your changes?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss} textColor="red">DISCARD</Button>
            <Button onPress={onStay} textColor={theme.colors.primary}>STAY</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
}