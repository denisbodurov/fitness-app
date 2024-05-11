import { PromptDialogProps } from "@/types/components/PromptDialog";
import { Button, Dialog, Portal, Text } from "react-native-paper";


export default function PromptDialog({visible, title, content, onConfirm, onCancel, theme} : PromptDialogProps) {

    return (
        <Portal>
        <Dialog visible={visible} onDismiss={onCancel}>
          <Dialog.Title><Text variant="titleLarge">{title}</Text></Dialog.Title>
          <Dialog.Content>
            <Text variant="titleSmall">{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onCancel} textColor={theme.colors.primary}>CANCEL</Button>
            <Button onPress={onConfirm} textColor="red">CONFIRM</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
}