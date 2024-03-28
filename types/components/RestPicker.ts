import { Dispatch, SetStateAction } from "react";
import { MD3Theme } from "react-native-paper";

export interface RestPickerProps {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  theme: MD3Theme;
}
