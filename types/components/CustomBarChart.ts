import { MD3Theme } from "react-native-paper";

export interface CustomBarChartData {
    value: number;
    label: string;
}

export interface CustomBarChartProps {
    data: CustomBarChartData[];
    theme: MD3Theme;
}
