import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "@/utils/hooks/useFirebase";

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

  const [status, setStatus] = useState({
    isLoading: false,
    error: "",
  });

  const { signUp } = useFirebase();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    if (
      credentials.firstName &&
      credentials.lastName &&
      credentials.email &&
      credentials.password &&
      credentials.confirmPassword
    ) {
      if (credentials.password === credentials.confirmPassword) {
        setStatus({ ...status, isLoading: true });
        try {
          const response = signUp(
            credentials.firstName,
            credentials.lastName,
            credentials.email,
            credentials.password,
            "male",
            new Date("2005-01-27"),
            70,
            183
          );

          if ((await response).user) {
            router.navigate("/(auth)/sign-in");
          }

          if ((await response).error !== undefined) {
            setStatus({ ...status, error: (await response).error! });
          }
        } catch (e) {
          return { error: e };
        } finally {
          setStatus((prevStatus) => {
            return { ...prevStatus, isLoading: true };
          });
        }
      } else {
        setStatus({ ...status, error: "Passwords do not match!" });
      }
    } else {
      setStatus({ ...status, error: "Please fill in all fields!" });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formGroup}>
            <Text variant="headlineLarge" style={styles.title}>
              SPARKFIT
            </Text>
            {status.error && (
              <View
                style={{
                  ...styles.errorContainer,
                  backgroundColor: theme.colors.errorContainer,
                }}
              >
                <Text
                  style={{
                    ...styles.errorMessage,
                    color: theme.colors.onErrorContainer,
                  }}
                >
                  {status.error}
                </Text>
              </View>
            )}
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
                  error={status.error ? true : false}
                />
                <TextInput
                  style={styles.nameInput}
                  label="Last Name"
                  mode="outlined"
                  textContentType="familyName"
                  onChangeText={(lastName) =>
                    setCredentials({ ...credentials, lastName })
                  }
                  error={status.error ? true : false}
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
                error={status.error ? true : false}
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
                error={status.error ? true : false}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    color={
                      status.error ? theme.colors.error : theme.colors.outline
                    }
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
                error={status.error ? true : false}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    color={
                      status.error ? theme.colors.error : theme.colors.outline
                    }
                    onPress={togglePasswordVisibility}
                  />
                }
              />
            </View>
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
                {status.isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.onPrimary}
                  />
                ) : (
                  <Text
                    variant="titleMedium"
                    style={{
                      ...styles.buttonTitle,
                      color: theme.colors.onPrimary,
                    }}
                  >
                    SIGN UP
                  </Text>
                )}
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
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formGroup: {
    width: "100%",
    maxHeight: 600,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 40,
    gap: 20,
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
    position: "absolute",
    width: "100%",
    elevation: 3,
    borderRadius: 10,
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
  },
  signupGroup: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },
  actionGroup: {
    position: "relative",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    height: 85,
    padding: 40,
  },
  errorContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  errorMessage: {
    fontFamily: "LatoBold",
  },
});
