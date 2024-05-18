import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Snackbar,
  Portal,
  Modal,
  ToggleButton,
  SegmentedButtons,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFirebase from "@/utils/hooks/useFirebase";
import { Image } from "expo-image";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";
import { Credentials } from "@/types/states/Credentials";
import Icon from "@/components/Icon";
import { formatDate } from "@/helpers/formatDate";
import SelectField from "@/components/SelectField";
import PickerDialog from "@/components/InputDialog";

export default function ModalScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [credentials, setCredentials] = useState<Credentials>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: new Date(),
    weight: "",
    height: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [weightDialog, setWeightDialog] = useState(false);
  const [heightDialog, setHeightDialog] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [isFocused, setIsFocused] = useState({
    fname: false,
    lname: false,
    email: false,
    password: false,
    confirmPassword: false,
    dob: false,
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
      credentials.confirmPassword &&
      credentials.dob &&
      credentials.gender
    ) {
      if (credentials.password === credentials.confirmPassword) {
        setStatus({ ...status, isLoading: true });
        try {
          const response = signUp(
            credentials.firstName,
            credentials.lastName,
            credentials.email,
            credentials.password,
            credentials.gender,
            credentials.dob,
            parseInt(credentials.weight),
            parseInt(credentials.height)
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

  const handleWeightChange = (value: string | undefined) => {
    if (value) {
      value.replace(/[^0-9]/g, "");
      setCredentials({ ...credentials, weight: value || "" });
    } else {
      setCredentials({ ...credentials, weight: "" });
    }
  };

  const handleHeightChange = (value: string | undefined) => {
    if (value) {
      value.replace(/[^0-9]/g, "");
      setCredentials({ ...credentials, height: value || "" });
    } else {
      setCredentials({ ...credentials, height: "" });
    }
  };

  return (
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
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
                      icon={
                        isPasswordVisible ? "eye-off-outline" : "eye-outline"
                      }
                      color={
                        isFocused.password
                          ? status.error
                            ? theme.colors.error
                            : theme.colors.primary
                          : status.error
                          ? theme.colors.error
                          : theme.colors.outline
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
                      icon={
                        isPasswordVisible ? "eye-off-outline" : "eye-outline"
                      }
                      color={
                        isFocused.confirmPassword
                          ? status.error
                            ? theme.colors.error
                            : theme.colors.primary
                          : status.error
                          ? theme.colors.error
                          : theme.colors.outline
                      }
                      onPress={togglePasswordVisibility}
                    />
                  }
                />
                <View style={styles.rowContainer}>
                  <View style={styles.halfContainer}>
                    <Text
                      variant="titleMedium"
                      style={{ ...styles.text, color: theme.colors.outline }}
                    >
                      Date of Birth
                    </Text>
                    <SelectField
                      value={formatDate(credentials.dob)}
                      onPress={() => setModalVisible(true)}
                      theme={theme}
                    />
                    <DatePickerModal
                      presentationStyle="overFullScreen"
                      locale="en"
                      mode="single"
                      onChange={(value) => {
                        if (value.date)
                          setCredentials({
                            ...credentials,
                            dob: new Date(value.date),
                          });
                      }}
                      visible={modalVisible}
                      onDismiss={() => setModalVisible(false)}
                      date={credentials.dob}
                      onConfirm={() => setModalVisible(false)}
                    />
                  </View>
                  <View style={styles.halfContainer}>
                    <Text
                      variant="titleMedium"
                      style={{ ...styles.text, color: theme.colors.outline }}
                    >
                      Gender
                    </Text>
                    <SegmentedButtons
                      value={credentials.gender}
                      style={styles.genderButtons}
                      onValueChange={(value) => {
                        if (value === "male" || value === "female") {
                          setCredentials({ ...credentials, gender: value });
                        }
                      }}
                      // style={styles.segmentedButtons}
                      theme={{
                        colors: {
                          onSurface: theme.colors.outline,
                        },
                      }}
                      buttons={[
                        {
                          value: "male",
                          icon: "gender-male",
                          labelStyle: {
                            ...styles.text,
                            color: theme.colors.outline,
                          },
                          style: {
                            borderRadius: 10,
                          },
                        },
                        {
                          value: "female",
                          icon: "gender-female",
                          labelStyle: {
                            ...styles.text,
                            color: theme.colors.outline,
                          },
                          style: {
                            borderRadius: 10,
                          },
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.actionGroup}>
              <Button
                style={{
                  ...styles.button,
                  backgroundColor: theme.colors.primary,
                }}
                mode="contained"
                onPress={() => setStepTwo(true)}
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
        <Portal>
          <Modal
            visible={stepTwo}
            dismissable={false}
            contentContainerStyle={{
              ...styles.modal,
              backgroundColor: theme.colors.background,
            }}
          >
            <PickerDialog
              visible={weightDialog}
              onConfirm={() => setWeightDialog(false)}
              onCancel={() => setWeightDialog(false)}
              value={credentials.weight.toString()}
              onChange={(value) => {
                handleWeightChange(value);
              }}
              type="weight"
              theme={theme}
            />
            <PickerDialog
              visible={heightDialog}
              onConfirm={() => setHeightDialog(false)}
              onCancel={() => setHeightDialog(false)}
              value={credentials.height.toString()}
              onChange={(value) => {
                handleHeightChange(value);
              }}
              type="height"
              theme={theme}
            />
            <Text variant="titleLarge" style={styles.text}>
              ONE LAST THING
            </Text>
            <View style={styles.modalRow}>
              <View style={styles.modalColumn}>
                <Text
                  variant="titleMedium"
                  style={{ ...styles.text, color: theme.colors.outline }}
                >
                  Weight
                </Text>
                <SelectField
                  value={credentials.weight.toString() + "kg"}
                  onPress={() => setWeightDialog(true)}
                  theme={theme}
                />
              </View>
              <View style={styles.modalColumn}>
                <Text
                  variant="titleMedium"
                  style={{ ...styles.text, color: theme.colors.outline }}
                >
                  Height
                </Text>
                <SelectField
                  value={credentials.height.toString() + "cm"}
                  onPress={() => setHeightDialog(true)}
                  theme={theme}
                />
              </View>
            </View>
            <Button
              style={{
                ...styles.confirmButton,
                backgroundColor: theme.colors.primary,
              }}
              mode="contained"
              onPress={() => {
                setStepTwo(false);
                handleSignUp();
              }}
            >
              CONFIRM
            </Button>
          </Modal>
        </Portal>
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
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 30,
    height: "100%",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    width: "50%",
    backgroundColor: "transparent",
  },
  inputGroup: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    width: "100%",
    gap: 10,
  },
  inputField: {
    width: "100%",
    backgroundColor: "transparent",
  },
  halfContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    width: "46%",
  },
  genderButtons: {
    borderRadius: 10,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  confirmButton: {
    elevation: 3,
    borderRadius: 10,
    width: "100%",
  },
  buttonTitle: {
    fontFamily: "ProtestStrike",
  },
  selectField: {
    minWidth: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
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
