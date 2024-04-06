import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text variant="headlineLarge" style={styles.title}>
            SIGN IN
          </Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.inputField}
              label="Username"
              mode="outlined"
              textContentType="username"
            />
            <TextInput
              style={styles.inputField}
              label="Password"
              mode="outlined"
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  onPress={togglePasswordVisibility}
                />
              }
            />
          </View>

          <View style={styles.actionGroup}>
          <Button
            style={{ ...styles.button, backgroundColor: theme.colors.primary }}
            mode="contained"
            onPress={() => console.log("SIGN IN")}
          >
            <Text
              variant="titleMedium"
              style={{ ...styles.buttonTitle, color: theme.colors.onPrimary }}
            >
              LOGIN
            </Text>
          </Button>
          <View style={styles.signupGroup}>
            <Text>Don't have an account yet?</Text>
            <Button mode="text" onPress={() => router.replace("/(auth)/sign-up")}>
              SIGN UP
            </Button>
          </View>
          </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  formGroup: {
    width: "100%",
    height: 400,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  inputGroup: {
    width: "100%",
    gap: 10,
  },
  inputField: {
    width: "100%",
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  button: {
    width: "100%",
    elevation: 3,
    borderRadius: 10,
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
  },
  signupGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionGroup: {
    width: "100%",
    flexDirection: "column",
    gap: 5,
  }
});