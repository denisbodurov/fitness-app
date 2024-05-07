import { Timestamp } from "firebase/firestore";

export interface UserData {
  displayName: string | null;
  weight: number;
  height: number;
  gender: "male" | "female";
  dob: Timestamp;
  registrationDate: string | undefined;
}
