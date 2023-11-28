import React from 'react'
import {View, SafeAreaView, Image, Text} from 'react-native'
import styles from './splash.style'
import logo from '../../../assets/images/logo.png'
import musium from '../../../assets/images/musium.png'

const Splash = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate("Login")
    }, 2000)

  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={logo} style={styles.logo}/>
    </SafeAreaView>
  )
}

export default Splash
