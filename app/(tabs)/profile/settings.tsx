import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, Switch, TextInput, Title, IconButton, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Settings {
  units: 'metric' | 'imperial';
  dateOfBirth: string;
  weight: number;
  height: number;
  gender: string;
}

function Settings () {
  const [settings, setSettings] = useState<Settings>({
    units: 'metric', // Initial unit preference
    dateOfBirth: '',
    weight: 0,
    height: 0,
    gender: '',
  });

  const theme = useTheme();

  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={{...styles.header, backgroundColor: theme.colors.surface}}>
        <IconButton icon="arrow-left" size={30} iconColor={theme.colors.onSurface} rippleColor={theme.colors.outline} onPress={() => router.back()}/>
        <Text variant='titleLarge' style={styles.headerTitle}>Settings</Text>
        <Button icon="content-save" mode="text" onPress={() => console.log('Pressed')} labelStyle={styles.buttonTitle}>
            SAVE
        </Button>
      </View>
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    headerTitle: {
        fontFamily: "ProtestStrike"
    },
    buttonTitle: {
        fontFamily: "ProtestStrike"
    }
});

export default Settings;
