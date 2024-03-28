import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Provider as PaperProvider,
  List,
  Text,
  IconButton,

} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 10,
  },
  restInput: {
    marginBottom: 10,
  },
  workoutList: {
    marginBottom: 10,
  },
});

const WorkoutPlanForm = () => {
  const [planTitle, setPlanTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [restBetweenReps, setRestBetweenReps] = useState('');
  const [restBetweenSets, setRestBetweenSets] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const difficulties = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  // const addWorkout = (workout) => {
  //   setWorkouts([...workouts, workout]);
  //   setModalVisible(false);
  // };

  // const removeWorkout = (index) => {
  //   setWorkouts(workouts.filter((_, i) => i !== index));
  // };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="Plan Title"
          value={planTitle}
          onChangeText={setPlanTitle}
          style={styles.textInput}
        />
        
        <TextInput
          label="Rest Between Reps (seconds)"
          value={restBetweenReps}
          onChangeText={setRestBetweenReps}
          keyboardType="numeric"
          style={styles.restInput}
        />
        <TextInput
          label="Rest Between Sets (seconds)"
          value={restBetweenSets}
          onChangeText={setRestBetweenSets}
          keyboardType="numeric"
          style={styles.restInput}
        />
        <Button mode="contained" onPress={() => setModalVisible(true)}>
          Add Workout
        </Button>
        <List.Section title="Workouts" style={styles.workoutList}>
          {workouts.map((workout, index) => (
            <List.Item key={index} title={workout} right={() => (
              <IconButton icon="delete" />
            )} />
          ))}
        </List.Section>
      </View>
    </PaperProvider>
  );
};

export default WorkoutPlanForm;
