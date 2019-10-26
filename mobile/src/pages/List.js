import React, { useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import { View, Alert, Text, ScrollView, TouchableOpacity, AsyncStorage, Image, StyleSheet, SafeAreaView } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {

  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.56.1:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then( storageTechs => {
      const techsArray = storageTechs.split(',').map( tech => tech.trim());
      
      setTechs(techsArray);
    })
  }, []);

  function handleLogout() {
    AsyncStorage.setItem('user', '');
    AsyncStorage.setItem('techs', '');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>

      { AsyncStorage.getItem('user') && (
        <TouchableOpacity onPress={() => handleLogout()} style={styles.button}>
          <Text styles={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      )}
    
      <Image style={styles.logo} source={logo} />
    
      <ScrollView>
        { techs.map(tech => <SpotList key={tech} tech={tech} />) }
      </ScrollView>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 25,
  },

  logo: {
    height: 32,
    resizeMode:'contain',
    alignSelf: 'center',
    marginTop: 30,
  },

});