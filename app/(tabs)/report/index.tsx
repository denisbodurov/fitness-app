import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text} from 'react-native'


export default function TabOneScreen() {
  const theme = useTheme()

  return (
    <View style={{...style.container, backgroundColor: theme.colors.background}}>
        
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
});
