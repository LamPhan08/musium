import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './homeNewRelease.style'
import HomeNewReleaseTopTabNavigator from '../../navigators/HomeNewReleaseTopTabNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'


const HomeNewRelease = ({ newReleaseData }) => {
  // console.log(newReleaseData.items.all[1])

  return (
    <View style={styles.newReleaseContainer}>
      <TouchableOpacity style={styles.titleWrapper}>
        <Text style={styles.title}>{newReleaseData.title}</Text>

        <Ionicons name='chevron-forward' style={styles.icon} />
      </TouchableOpacity>

      <HomeNewReleaseTopTabNavigator newReleaseData={newReleaseData} />
    </View>
  )
}

export default HomeNewRelease
