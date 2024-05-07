import { PromptDialogProps } from "@/types/components/PromptDialog";
import { Button, Dialog, Portal, Text } from "react-native-paper";


export default function PromptDialog({visible, onConfirm, onCancel, theme} : PromptDialogProps) {

    return (
        <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Title><Text variant="titleLarge">Are you sure you want to delete this workout plan?</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant="titleSmall">You cannot undo this action!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onCancel} textColor={theme.colors.primary}>CANCEL</Button>
            <Button onPress={onConfirm} textColor="red">CONFIRM</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
}