import { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import useFirebase from "@/utils/hooks/useFirebase";
import { Image } from "expo-image";

export default function SignInScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { signIn } = useFirebase();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const [status, setStatus] = useState({
    isLoading: false,
    error: "",
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (!credentials.email || !credentials.password) {
      setStatus({ ...status, error: "Please fill in all fields" });
      return;
    }

    setStatus({ ...status, isLoading: true });
    try {
      const response = await signIn(credentials.email, credentials.password);

      if (response.user) {
        router.navigate("/(tabs)/home");
      }

      if (response.error) {
        setStatus({ ...status, error: response.error });
      }
    } catch (error: any) {
      setStatus({
        ...status,
        error: "Something went wrong. Please try again later!",
      });
    } finally {
      setStatus((prevStatus) => {
        return { ...prevStatus, isLoading: false };
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom
      }}
    >
    <View style={styles.mainContainer}>
      <Image
        style={styles.backgroundImage}
        source={require("@/assets/images/auth-background.jpg")}
      />
      <View style={styles.backgroundDim} />
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
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
                style={styles.inputField}
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
                onChangeText={(password) =>
                  setCredentials({ ...credentials, password })
                }
                secureTextEntry={!isPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    color={
                      status.error ? theme.colors.error : theme.colors.outline
                    }
                    onPress={togglePasswordVisibility}
                  />
                }
                error={status.error ? true : false}
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
              onPress={handleSignIn}
              disabled={status.isLoading}
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
                  SIGN IN
                </Text>
              )}
            </Button>
            <View style={styles.signinGroup}>
              <Text style={{ ...styles.text, color: theme.colors.secondary }}>
                Don't have an account yet?
              </Text>
              <Button
                mode="text"
                onPress={() => router.navigate("/(auth)/sign-up")}
                labelStyle={styles.text}
              >
                SIGN UP
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  backgroundDim: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  keyboardAvoidingContainer: {
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
    maxHeight: 600,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    width: "100%",
    gap: 10,
  },
  inputField: {
    width: "100%",
    backgroundColor: "transparent"
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
    marginBottom: 10,
  },
  buttonTitle: {
    width: "100%",
    height: "100%",
    fontFamily: "ProtestStrike",
  },
  signinGroup: {
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
    gap: 10,
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
