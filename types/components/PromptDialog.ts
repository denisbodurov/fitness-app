import { MD3Theme } from "react-native-paper";

export interface PromptDialogProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  theme: MD3Theme;
}
