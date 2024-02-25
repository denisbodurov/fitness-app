import { Appbar, Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { HeaderType } from "@/types/components/Header";

function Header ({theme} : HeaderType) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{...style.mainContainer, backgroundColor: theme.colors.surface}}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
    </View>
  )
}

const style = StyleSheet.create({
    mainContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10
    }
})

export default Header