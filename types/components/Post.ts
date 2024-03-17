import { MD3Theme } from "react-native-paper";

export interface PostData {
  id: number;
  imageURL?: string;
  title: string;
  type: string;
  postDate: Date;
}

export interface PostProps {
  id: number;
  imageURL?: string;
  title: string;
  type: string;
  postDate: Date;
  theme: MD3Theme;
}

export interface PostListProps {
  data: PostData[];
  theme: MD3Theme;
}
