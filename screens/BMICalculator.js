import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiResult, setBmiResult] = useState('');
  const [userEmail, setUserEmail] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  const calculateBMI = async () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    let result = '';
    if (bmiValue < 18.5) {
      result = 'Bajo peso';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      result = 'Peso normal';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      result = 'Sobrepeso';
    } else {
      result = 'Obesidad';
    }
    setBmiResult(result);

    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch('http://localhost:5000/api/bmi/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail, weight, height, bmi: bmiValue.toFixed(2), bmiResult: result }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar los datos de IMC');
      }

      console.log('Datos de IMC guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos de IMC:', error);
    }
  };

  const getDietRecommendation = (bmiResult) => {
    switch (bmiResult) {
      case 'Bajo peso':
        return 'Recomendaciones para bajo peso...';
      case 'Peso normal':
        return 'Recomendaciones para peso normal...';
      case 'Sobrepeso':
        return 'Recomendaciones para sobrepeso...';
      case 'Obesidad':
        return 'Recomendaciones para obesidad...';
      default:
        return 'No se encontraron recomendaciones.';
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/vegan_diet.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Peso (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Altura (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button mode="contained" onPress={calculateBMI} style={styles.button}>
          Calcular IMC
        </Button>
        {bmi && (
          <View style={[styles.card, styles.resultContainer]}>
            <Text style={styles.resultText}>Tu IMC es: {bmi}</Text>
            <Text style={styles.resultText}>Clasificación: {bmiResult}</Text>
            <Text style={styles.recommendation}>{getDietRecommendation(bmiResult)}</Text>
          </View>
        )}
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
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,  
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
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendation: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BMICalculator;
