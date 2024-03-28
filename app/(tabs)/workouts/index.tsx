import CustomPlanList from '@/components/CustomPlanList';
import Icon from '@/components/Icon';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
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
      <View style={styles.header}>
      <Searchbar
        style={{...styles.searchbar, backgroundColor: theme.colors.surface }}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={2}
      />
      <Link asChild href="/(tabs)/workouts/(manage_workouts)/createWorkout">
        <TouchableOpacity>
          <Icon
            library="Feather"
            name="plus-circle"
            size={30}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </Link>
    </View>
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
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10
  },
  searchbar: {
    width: "90%",
  },
  
});
