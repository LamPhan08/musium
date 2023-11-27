import React from 'react'
import { View, Text } from 'react-native'
import styles from './homeNewRelease.style'
import HomeNewReleaseTopTabNavigator from '../../navigators/HomeNewReleaseTopTabNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'


const HomeNewRelease = ({ newReleaseData }) => {
  // console.log(newReleaseData.items.all[1])

  return (
    <View style={styles.newReleaseContainer}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{newReleaseData.title}</Text>

        <Ionicons name='chevron-forward' style={styles.icon} />
      </View>

      <HomeNewReleaseTopTabNavigator newReleaseData={newReleaseData} />
    </View>
  )
}

export default HomeNewRelease
