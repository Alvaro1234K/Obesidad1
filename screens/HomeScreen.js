import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const obesityInfo = [
  {
    title: "Desventajas de la Obesidad",
    content: [
      "Aumenta el riesgo de enfermedades crónicas como diabetes tipo 2.",
      "Enfermedades cardíacas y hipertensión.",
      "Apnea del sueño y ciertos tipos de cáncer.",
      "Problemas osteoarticulares."
    ]
  },
  {
    title: "Tipos de Obesidad",
    content: [
      "Obesidad visceral: acumulación de grasa alrededor de los órganos internos.",
      "Obesidad subcutánea: grasa debajo de la piel.",
      "Obesidad sarcopénica: pérdida de masa muscular combinada con aumento de grasa."
    ]
  },
  {
    title: "Prevención de la Obesidad",
    content: [
      "Llevar una dieta equilibrada y saludable.",
      "Hacer ejercicio regularmente.",
      "Dormir lo suficiente y manejar el estrés.",
      "Evitar el consumo excesivo de alimentos procesados y bebidas azucaradas."
    ]
  }
];

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/obesity_disadvantages.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        {obesityInfo.map((info, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={info.title} />
            <Card.Content>
              {info.content.map((item, idx) => (
                <Text key={idx}>{item}</Text>
              ))}
            </Card.Content>
          </Card>
        ))}
        <Button mode="contained" onPress={() => navigation.navigate('BMI')} style={styles.button}>
          Calcular IMC
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('Routines')} style={styles.button}>
          Rutinas
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('Settings')} style={styles.button}>
          Configuración
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Cerrar Sesión
        </Button>
      </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
