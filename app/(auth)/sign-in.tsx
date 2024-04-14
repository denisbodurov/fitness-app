import { useState }  from "react";
import { StyleSheet, View, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useTheme, Text, TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import useFirebase from "@/utils/hooks/useFirebase";

export default function SignInScreen() {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [status, setStatus] = useState({
    isLoading: false,
    error: "",
  });
  const { signIn } = useFirebase();
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
              <Text>Don't have an account yet?</Text>
              <Button
                mode="text"
                onPress={() => router.navigate("/(auth)/sign-up")}
              >
                SIGN UP
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
  },
  title: {
    fontFamily: "ProtestStrike",
  },
  button: {
    width: "100%",
    elevation: 3,
    height: 50,
    padding: 0,
    borderRadius: 10,
  },
  buttonTitle: {
    width: "100%",
    height: "100%",
    fontFamily: "ProtestStrike",
  },
  signinGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionGroup: {
    width: "100%",
    flexDirection: "column",
    gap: 5,
    padding: 20,
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
