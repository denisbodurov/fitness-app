import { MD3Theme } from "react-native-paper";

export interface UnsavedChangesDialogProps {
  visible: boolean;
  onStay: () => void;
  onDismiss: () => void;
  theme: MD3Theme;
}
