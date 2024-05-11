// Defining type for the custom Icon component
export interface IconProps {
  name: string;
  color: string;
  size?: number;
  library:
    | "FontAwesome"
    | "FontAwesome5"
    | "FontAwesome6"
    | "AntDesign"
    | "MaterialCommunityIcons"
    | "Ionicons"
    | "Entypo"
    | "Feather";
};
