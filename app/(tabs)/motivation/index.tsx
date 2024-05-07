import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, useTheme, Text, ActivityIndicator } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase-config";
import { Quote } from "@/types/states/Quote";

export default function Feed() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [quotes, setQuotes] = useState<Quote[] | undefined>();
  const [currentQuote, setCurrentQuote] = useState<number>();
  const [status, setStatus] = useState({
    isLoading: true,
    error: "",
  });

  const handleRandom = () => {

    if (!quotes || quotes.length === 0) {
      return;
    }
  
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentQuote);
  
    setCurrentQuote(randomIndex);
  };

  useEffect(() => {
    const fetchMotivationData = async () => {
      try {

        const motivationRef = collection(FIREBASE_DB, "motivation");

        const motivationSnapshot = await getDocs(motivationRef);

        if (motivationSnapshot) {
          const motivationData = motivationSnapshot.docs.map(
            (doc) => doc.data() as Quote
          );

          if(motivationData) {
            setQuotes(motivationData);
          } else {
            setStatus({ ...status, error: `FAILED TO FETCH QUOTES` });
          }

        } else {
          setStatus({ ...status, error: `FAILED TO FETCH QUOTES` });
        }
      } catch (error) {
        setStatus({ ...status, error: `FAILED TO FETCH QUOTES` });
      } finally {
        setStatus((prevStatus) => {
          return { ...prevStatus, isLoading: false };
        });
      }
    };

    fetchMotivationData();
  }, []);

  useEffect(() => {
    handleRandom();
  }, [quotes])



  return (
    <View
      style={{
        ...styles.safeArea,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
      }}
    >
      {status.isLoading ? (
        <ActivityIndicator/>
      ) : (status.error) ? (
        <Text variant="headlineMedium">{status.error}</Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.motivationContainer}>
              <Text
                variant="titleMedium"
                style={{
                  ...styles.text,
                  ...styles.motivation,
                  borderColor: theme.colors.primary,
                }}
              >
              {(quotes && currentQuote !== undefined) && quotes[currentQuote].quote}
              </Text>
              <Text
                variant="titleMedium"
                style={{ ...styles.text, ...styles.author }}
              >
                ~ {(quotes && currentQuote !== undefined) && quotes[currentQuote].author}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              style={{
                ...styles.button,
                backgroundColor: theme.colors.primary,
              }}
              onPress={handleRandom}
            >
              <Text
                variant="titleMedium"
                style={{ ...styles.text, color: theme.colors.onPrimary }}
              >
                MOTIVATE ME
              </Text>{" "}
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  button: {
    width: "100%",
  },
  buttonContainer: {
    padding: 20,
  },
  text: {
    fontFamily: "ProtestStrike",
  },
  author: {
    padding: 10,
  },
  motivation: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  motivationContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
});
