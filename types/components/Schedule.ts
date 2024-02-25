import { MD3Theme } from "react-native-paper"

export interface ScheduleDataType {
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
    }
}

export interface ScheduleType {
    scheduleData: ScheduleDataType;
    theme: MD3Theme
}

export interface DayType {
    day: string;
    rest: boolean;
    theme: MD3Theme;
}