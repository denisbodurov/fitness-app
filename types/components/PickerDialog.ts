import { MD3Theme } from "react-native-paper";

export interface PickerDialogProps {
  value?: string;
  visible: boolean;
  onChange: (text?: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  type: "weight" | "height";
  theme: MD3Theme;
}
