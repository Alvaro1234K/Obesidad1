import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data without authentication
    const fetchUserData = async () => {
      // const userToken = await AsyncStorage.getItem('userToken');
      // if (!userToken) {
      //   navigation.navigate('Login');
      //   return;
      // }

      try {
        // const response = await axios.get('http://localhost:5000/api/users/me', {
        //   headers: {
        //     'Authorization': `Bearer ${userToken}`
        //   }
        // });
        // const user = response.data;
        // setUserId(user._id);
        // setEmail(user.email);

        // Simulated user data for testing without authentication
        const user = { _id: '123456', email: 'test@example.com' };
        setUserId(user._id);
        setEmail(user.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // navigation.navigate('Login');
      }
    };

    fetchUserData();
  }, [navigation]);

  const updateUser = async () => {
    try {
      // const userToken = await AsyncStorage.getItem('userToken');
      // if (!userToken) {
      //   Alert.alert('Usuario no autenticado');
      //   return;
      // }

      await axios.put(`http://localhost:5000/api/users/${userId}`, { email, password }, {
        // headers: {
        //   'Authorization': `Bearer ${userToken}`
        // }
      });
      Alert.alert('Cuenta actualizada correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar la cuenta');
    }
  };

  const deleteUser = async () => {
    try {
      // const userToken = await AsyncStorage.getItem('userToken');
      // if (!userToken) {
      //   Alert.alert('Usuario no autenticado');
      //   return;
      // }

      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        // headers: {
        //   'Authorization': `Bearer ${userToken}`
        // }
      });
      // await AsyncStorage.removeItem('userToken');
      Alert.alert('Cuenta eliminada correctamente');
      // navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al eliminar la cuenta');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/obesity_prevention.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={updateUser} style={styles.button}>
          Actualizar Cuenta
        </Button>
        <Button mode="contained" onPress={deleteUser} style={styles.deleteButton}>
          Eliminar Cuenta
        </Button>
      </View>
    </ImageBackground>
  );
}

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
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: 'red',
  },
});
