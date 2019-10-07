import React, { useState } from 'react';
import { SafeAreaView, Alert, View, TouchableOpacity, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {

  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });

    Alert.alert('Solicitação de reserva Enviada!');

    navigation.navigate('List');

  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView styles={styles.container}>
      <View>
        <Text style={styles.label}>DATA DE INTERESSE *</Text>
      </View>
      <TextInput 
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"        
        autoCorrect={false} 
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    margin: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});