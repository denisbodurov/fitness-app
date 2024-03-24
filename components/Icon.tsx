import React from "react";

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

function Icon({ name, color, size = 28, library }: IconProps) {
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

  return <IconComponent size={size} name={name} color={color}/>;
}

export default Icon;
