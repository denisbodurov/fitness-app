import CustomPlan from '@/components/CustomPlan';
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
        <CustomPlan id={1} title="Test title" information = "15 minutes" difficulty={3} theme={theme}/>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  
});
