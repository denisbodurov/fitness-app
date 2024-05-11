import { IconProps } from "@/types/components/Icon";

import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";

function Icon({ name, color, library, size = 28 }: IconProps) {
  const IconComponent = {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    AntDesign,
    MaterialCommunityIcons,
    Ionicons,
    Feather,
    Entypo,
  }[library];

  // Rendering an icon based on the passed props
  return <IconComponent size={size} name={name} color={color} />;
}

export default Icon;
