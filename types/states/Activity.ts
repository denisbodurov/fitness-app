import { Timestamp } from "firebase/firestore";

export interface Activity {
  date: Timestamp;
  seconds: number;
}
