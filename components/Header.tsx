import { Searchbar } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { HeaderType } from "@/types/components/Header";
import { Link } from "expo-router";
import Icon from "./Icon";

function Header({ theme }: HeaderType) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={style.mainContainer}>
      <Searchbar
        style={{...style.searchbar, backgroundColor: theme.colors.surface }}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={2}
      />
      <Link asChild href="/(tabs)/profile">
        <TouchableOpacity>
          <Icon
            library="Feather"
            name="plus-circle"
            size={30}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10
  },
  searchbar: {
    width: "90%",
  },
});

export default Header;
