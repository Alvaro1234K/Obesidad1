import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const RoutinesScreen = () => {
  const [routines, setRoutines] = useState([]);
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineDescription, setNewRoutineDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/routines');
      const data = await response.json();
      setRoutines(data);
    } catch (error) {
      console.error('Error al obtener las rutinas:', error);
    }
  };

  const addRoutine = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/routines/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newRoutineTitle,
          description: newRoutineDescription,
        }),
      });
      const data = await response.json();
      setRoutines([...routines, data]);
      setNewRoutineTitle('');
      setNewRoutineDescription('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error al agregar la rutina:', error);
    }
  };

  const renderRoutineItem = ({ item }) => (
    <View style={styles.routineItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/images/dash_diet.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {showAddForm ? (
          <View>
            <TextInput
              label="Título"
              value={newRoutineTitle}
              onChangeText={setNewRoutineTitle}
              style={styles.input}
            />
            <TextInput
              label="Descripción"
              value={newRoutineDescription}
              onChangeText={setNewRoutineDescription}
              style={styles.input}
            />
            <Button mode="contained" onPress={addRoutine} style={styles.button}>
              Agregar Rutina
            </Button>
          </View>
        ) : (
          <Button mode="contained" onPress={() => setShowAddForm(true)} style={styles.addButton}>
            Agregar Rutina
          </Button>
        )}
        <FlatList
          data={routines}
          renderItem={renderRoutineItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  routineItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  addButton: {
    marginBottom: 16,
  },
});

export default RoutinesScreen;
