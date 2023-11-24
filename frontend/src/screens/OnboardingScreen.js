import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Musium from '../../assets/images/musiumlogo.svg';
import LinearGradient from 'react-native-linear-gradient';
const OnboardingScreen = ({navigation}) => {
  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ height: '100%'}}>
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      }}>
      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Musium
          width={300}
          height={300}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#06A0B5',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Music On
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;