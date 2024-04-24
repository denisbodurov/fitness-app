import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
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
  Snackbar,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFirebase from "@/utils/hooks/useFirebase";
import { Image } from "expo-image";

export default function ModalScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    fname: false,
    lname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [status, setStatus] = useState({
    isLoading: false,
    error: "",
    success: "",
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
            setStatus({ ...status, success: "REGISTRATION SUCCESSFUL" });
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
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
      }}
    >
      <Image
        style={styles.backgroundImage}
        source={require("@/assets/images/auth-background.jpg")}
      />
      <View style={styles.backgroundDim} />
      <KeyboardAvoidingView
        style={{
          ...styles.keyboardAvoidingContainer,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formGroup}>
            <Text
              variant="headlineLarge"
              style={{ ...styles.title, color: theme.colors.secondary }}
            >
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
                  theme={{
                    fonts: {
                      bodyLarge: {
                        ...theme.fonts.bodyLarge,
                        fontFamily: "ProtestStrike",
                      },
                    },
                  }}
                  textColor={
                    isFocused.fname
                      ? status.error
                        ? theme.colors.error
                        : theme.colors.primary
                      : theme.colors.outline
                  }
                  mode="flat"
                  underlineColor={theme.colors.outline}
                  textContentType="givenName"
                  onFocus={() => setIsFocused({ ...isFocused, fname: true })}
                  onBlur={() => setIsFocused({ ...isFocused, fname: false })}
                  onChangeText={(firstName) =>
                    setCredentials({ ...credentials, firstName })
                  }
                  error={status.error ? true : false}
                />
                <TextInput
                  style={styles.nameInput}
                  label="Last Name"
                  theme={{
                    fonts: {
                      bodyLarge: {
                        ...theme.fonts.bodyLarge,
                        fontFamily: "ProtestStrike",
                      },
                    },
                  }}
                  textColor={
                    isFocused.lname
                      ? status.error
                        ? theme.colors.error
                        : theme.colors.primary
                      : theme.colors.outline
                  }
                  mode="flat"
                  underlineColor={theme.colors.outline}
                  textContentType="familyName"
                  onFocus={() => setIsFocused({ ...isFocused, lname: true })}
                  onBlur={() => setIsFocused({ ...isFocused, lname: false })}
                  onChangeText={(lastName) =>
                    setCredentials({ ...credentials, lastName })
                  }
                  error={status.error ? true : false}
                />
              </View>
              <TextInput
                style={styles.inputField}
                label="Email"
                theme={{
                  fonts: {
                    bodyLarge: {
                      ...theme.fonts.bodyLarge,
                      fontFamily: "ProtestStrike",
                    },
                  },
                }}
                textColor={
                  isFocused.email
                    ? status.error
                      ? theme.colors.error
                      : theme.colors.primary
                    : theme.colors.outline
                }
                mode="flat"
                underlineColor={theme.colors.outline}
                textContentType="emailAddress"
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                onChangeText={(email) =>
                  setCredentials({ ...credentials, email })
                }
                error={status.error ? true : false}
              />
              <TextInput
                style={{ ...styles.inputField }}
                label="Password"
                theme={{
                  fonts: {
                    bodyLarge: {
                      ...theme.fonts.bodyLarge,
                      fontFamily: "ProtestStrike",
                    },
                  },
                }}
                textColor={
                  isFocused.password
                    ? status.error
                      ? theme.colors.error
                      : theme.colors.primary
                    : theme.colors.outline
                }
                mode="flat"
                underlineColor={theme.colors.outline}
                textContentType="password"
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                secureTextEntry={!isPasswordVisible}
                onChangeText={(password) =>
                  setCredentials({ ...credentials, password })
                }
                error={status.error ? true : false}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    color={
                      isFocused.password ? (status.error ? theme.colors.error : theme.colors.primary) : (status.error ? theme.colors.error : theme.colors.outline)
                    }
                    onPress={togglePasswordVisibility}
                  />
                }
              />
              <TextInput
                style={styles.inputField}
                label="Confirm Password"
                theme={{
                  fonts: {
                    bodyLarge: {
                      ...theme.fonts.bodyLarge,
                      fontFamily: "ProtestStrike",
                    },
                  },
                }}
                textColor={
                  isFocused.confirmPassword
                    ? status.error
                      ? theme.colors.error
                      : theme.colors.primary
                    : theme.colors.outline
                }
                mode="flat"
                underlineColor={theme.colors.outline}
                textContentType="password"
                onFocus={() =>
                  setIsFocused({ ...isFocused, confirmPassword: true })
                }
                onBlur={() =>
                  setIsFocused({ ...isFocused, confirmPassword: false })
                }
                secureTextEntry={!isPasswordVisible}
                onChangeText={(confirmPassword) =>
                  setCredentials({ ...credentials, confirmPassword })
                }
                error={status.error ? true : false}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    color={
                      isFocused.confirmPassword ? (status.error ? theme.colors.error : theme.colors.primary) : (status.error ? theme.colors.error : theme.colors.outline)
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
              <Text style={{ ...styles.text, color: theme.colors.secondary }}>
                Already have an account?
              </Text>
              <Button
                mode="text"
                onPress={() => router.replace("/(auth)/sign-in")}
                labelStyle={{ ...styles.text }}
              >
                SIGN IN
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {status.success && (
        <Snackbar
          visible={status.success ? true : false}
          onDismiss={() => router.replace("/(auth)/sign-in")}
          style={{ backgroundColor: "#5cb85c" }}
          duration={3000}
          action={{
            label: "DISMISS",
            labelStyle: {
              color: "white",
              fontFamily: "ProtestStrike",
            },
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: "white", fontFamily: "ProtestStrike" }}
          >
            {status.success}
          </Text>
        </Snackbar>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  backgroundDim: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 2000,
    height: 2000,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
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
    backgroundColor: "transparent",
  },
  inputGroup: {
    width: "100%",
    gap: 10,
  },
  inputField: {
    width: "100%",
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  text: {
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
