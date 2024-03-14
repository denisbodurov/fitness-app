import { MD3Theme } from "react-native-paper";

export interface PostProps {
  imageURL?: string;
  title: string;
  type: string;
  postDate: Date;
  theme: MD3Theme;
}
