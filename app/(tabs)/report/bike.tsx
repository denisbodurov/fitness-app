import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';


export default function TabOneScreen() {
  const theme = useTheme()

  return (
      <View style={{...styles.container, backgroundColor: theme.colors.background}}>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
