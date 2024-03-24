import { MD3Theme } from "react-native-paper";

export interface PickerDialogProps {
  value?: string;
  visible: boolean;
  onChange?: () => void;
  onStay: () => void;
  onDismiss: () => void;
  type: "weight" | "height";
  theme: MD3Theme;
}
