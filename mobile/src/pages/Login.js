import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, Text, Platform, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {

  const [ email, setEmail ] = useState('');
  const [ techs, setTechs ] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then( user => {
        if (user) {
          navigation.navigate('List');
        }
    })
  }, []);

  async function handleSubmit() {

     const response = await api.post('/sessions', {
       email
     });

     const { _id } = response.data;

     await AsyncStorage.setItem('user', _id);
     await AsyncStorage.setItem('techs', techs);

     navigation.navigate('List');
     
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View>
        <Text style={styles.label}>SEU E-MAIL *</Text>
      </View>
      <TextInput 
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"        
        autoCorrect={false} 
        value={email}
        onChangeText={setEmail}
      />

      <View>
        <Text style={styles.label}>TECNOLOGIAS *</Text>
      </View>
      <TextInput 
        style={styles.input}
        placeholder="Tecnologias de interesse"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Encontrar Spots</Text>
      </TouchableOpacity>
    
    </KeyboardAvoidingView>
  )
} 

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'    
  },

  form: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
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

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});


