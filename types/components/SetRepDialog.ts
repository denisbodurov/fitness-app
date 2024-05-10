import { MD3Theme } from "react-native-paper";

export interface SetRepDialogProps {
  visible: boolean;
  sets: string,
  reps: string,
  onChange: (type: "reps" | "sets", text?: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  theme: MD3Theme;
}
