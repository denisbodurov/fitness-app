import { MD3Theme } from "react-native-paper";

// Defining the type of the InputDialog component
export interface InputDialogProps {
  value?: string;
  visible: boolean;
  onChange: (text?: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  type: "weight" | "height";
  theme: MD3Theme;
}
