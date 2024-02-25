import Header from '@/components/Header';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutsScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header theme={theme}/>
      <ScrollView>
        
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
