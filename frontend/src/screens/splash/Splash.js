import React from 'react'
import {View, SafeAreaView, Image, Text} from 'react-native'
import styles from './styles'
import logo from '../../../assets/images/logo.png'

const Splash = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate("App")
    }, 2000)

  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image source={logo} style={styles.logo}/>
    </SafeAreaView>
  )
}

export default Splash