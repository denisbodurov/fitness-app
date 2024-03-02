import { MD3Theme } from "react-native-paper";

export interface ScheduleData {
  monday: {
    rest: boolean;
  };
  tuesday: {
    rest: boolean;
  };
  wednesday: {
    rest: boolean;
  };
  thursday: {
    rest: boolean;
  };
  friday: {
    rest: boolean;
  };
  saturday: {
    rest: boolean;
  };
  sunday: {
    rest: boolean;
  };
}

export interface ScheduleProps {
  scheduleData: ScheduleData;
  theme: MD3Theme;
}

export interface DayProps {
  day: string;
  rest: boolean;
  theme: MD3Theme;
}
