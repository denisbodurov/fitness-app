import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

function Header () {
  return (
    <Appbar.Header style={style.mainContainer}>
        <Appbar.BackAction onPress={() => console.log("Going back...")}/>
        <Appbar.Content title="Home"/>
        <Appbar.Action icon="cog" onPress={() => console.log("Settings...")}/>
    </Appbar.Header>
  )
}

const style = StyleSheet.create({
    mainContainer: {
        top: 0,
        left: 0
    }
})

export default Header