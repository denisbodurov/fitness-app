import { TimerProps } from "@/types/components/Timer";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Timer({ seconds, size = 20 } : TimerProps) {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;

  // Format time string with leading zeros 
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={{...styles.digits, fontSize: size}}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    width: 120,
  },
  digits: {
    fontFamily: "ProtestStrike",
    
  },
});

export default Timer;
