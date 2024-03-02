import CustomPlanList from '@/components/CustomPlanList';
import Header from '@/components/Header';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutsScreen() {
  const theme = useTheme();

  const mockData = [
    {
      title: "ARMS WORKOUT",
      information: "16 EXERCISES - 12 MINUTES",
      difficulty: 1,
      id: 1,
    },
    {
      title: "LEGS WORKOUT",
      information: "6 EXERCISES - 9 MINUTES",
      difficulty: 2,
      id: 2,
    },
    {
      title: "ABS WORKOUT",
      information: "12 EXERCISES - 11 MINUTES",
      difficulty: 3,
      id: 3,
    },

  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header theme={theme}/>
      <ScrollView>
        <CustomPlanList data={mockData} theme={theme}/>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  
});
