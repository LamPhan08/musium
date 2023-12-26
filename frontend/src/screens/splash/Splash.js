import React from 'react'
import {View, SafeAreaView, Image, Text} from 'react-native'
import styles from './splash.style'
import logo from '../../../assets/images/logo.png'
import musium from '../../../assets/images/musium.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    setTimeout(() => {
        // navigation.replace("Login")
        const checkUserLoggedIn = async () => {
          try {
            // Retrieve user data from AsyncStorage
            const userDataString = await AsyncStorage.getItem('userData');
    
            // If user data is present, navigate to the "Home" screen
            if (userDataString) {
              navigation.replace('App');
              console.log(userDataString)
            } else {
              // If no user data, navigate to the "Login" screen
              navigation.replace('Login');
            }
          } catch (error) {
            console.error('Error retrieving user data from AsyncStorage:', error);
            // Handle the error (e.g., display an error message)
          }
        };
    
        // Call the function to check user login status
        checkUserLoggedIn();
    }, 2000)

  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={logo} style={styles.logo}/>
    </SafeAreaView>
  )
}

export default Splash
