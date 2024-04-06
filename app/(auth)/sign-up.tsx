import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "@/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function ModalScreen() {
  const theme = useTheme();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    console.log("Inside")
    setIsLoading(true);
    
      console.log("Inside 2")
      if (credentials.password === credentials.confirmPassword) {
        console.log("Inside 3")
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          await updateProfile(response.user, {
            displayName: `${credentials.firstName} ${credentials.lastName}`,
          });
        } catch (e) {
          return { error: e };
        }
      }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text variant="headlineLarge" style={styles.title}>
            SIGN UP
          </Text>
          <View style={styles.inputGroup}>
            <View style={styles.nameGroup}>
              <TextInput
                style={styles.nameInput}
                label="First Name"
                mode="outlined"
                textContentType="givenName"
                onChangeText={(firstName) =>
                  setCredentials({ ...credentials, firstName })
                }
              />
              <TextInput
                style={styles.nameInput}
                label="Last Name"
                mode="outlined"
                textContentType="familyName"
                onChangeText={(firstName) =>
                  setCredentials({ ...credentials, firstName })
                }
              />
            </View>
            <TextInput
              style={styles.inputField}
              label="Email"
              mode="outlined"
              textContentType="emailAddress"
              onChangeText={(email) =>
                setCredentials({ ...credentials, email })
              }
            />
            <TextInput
              style={styles.inputField}
              label="Password"
              mode="outlined"
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              onChangeText={(password) =>
                setCredentials({ ...credentials, password })
              }
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  onPress={togglePasswordVisibility}
                />
              }
            />
            <TextInput
              style={styles.inputField}
              label="Confirm Password"
              mode="outlined"
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              onChangeText={(confirmPassword) =>
                setCredentials({ ...credentials, confirmPassword })
              }
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  onPress={togglePasswordVisibility}
                />
              }
            />
          </View>

          <View style={styles.actionGroup}>
            <Button
              style={{
                ...styles.button,
                backgroundColor: theme.colors.primary,
              }}
              mode="contained"
              onPress={handleSignUp}
            >
              <Text
                variant="titleMedium"
                style={{ ...styles.buttonTitle, color: theme.colors.onPrimary }}
              >
                REGISTER
              </Text>
            </Button>
            <View style={styles.signupGroup}>
              <Text>Already have an account?</Text>
              <Button
                mode="text"
                onPress={() => router.replace("/(auth)/sign-in")}
              >
                SIGN IN
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
    height: 600,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  nameGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  nameInput: {
    flexGrow: 1,
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
  },
});
