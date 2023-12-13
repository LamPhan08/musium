import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllNewRelease from '../screens/newRelease/allNewRelease/AllNewRelease'
import VPopNewRelease from '../screens/newRelease/vPopNewRelease/VPopNewRelease'
import OthersNewRelease from '../screens/newRelease/othersNewRelease/OthersNewRelease'
import { COLORS } from '../constants/colors'

const tabs = createMaterialTopTabNavigator()

const HomeNewReleaseTopTabNavigator = ({ newReleaseData }) => {
  // console.log(newReleaseData.items)
  const allNewReleaseData = newReleaseData.items.all
  const vPopNewReleaseData = newReleaseData.items.vPop
  const othersNewReleaseData = newReleaseData.items.others

  
  return (
    <tabs.Navigator screenOptions={{
      swipeEnabled: false,
      tabBarLabelStyle: { fontSize: 10, marginBottom: 20, fontFamily: 'Mulish-Bold' },
      tabBarInactiveTintColor: COLORS.text,
      tabBarActiveTintColor: COLORS.text,
      tabBarPressColor: 'transparent',
      tabBarStyle: {
        width: 260,
        height: 25,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        borderColor: COLORS.grey,
        borderWidth: 0.5,
      },
      tabBarItemStyle: {
        paddingTop: 1,
      },
      tabBarIndicatorContainerStyle: { justifyContent: 'center' },
      tabBarIndicatorStyle: {
        height: null,
        width: 260 / 3,
        top: 0,
        bottom: 0,
        borderRadius: 7,
        backgroundColor: COLORS.primary,
      }
    }}> 
      <tabs.Screen name='all' component={AllNewRelease} initialParams={{ data: allNewReleaseData }} options={{ title: 'Tất cả' }} />
      <tabs.Screen name='vPop' component={VPopNewRelease} initialParams={{ data: vPopNewReleaseData }} options={{ title: 'Việt Nam' }} />
      <tabs.Screen name='others' component={OthersNewRelease} initialParams={{ data: othersNewReleaseData }} options={{ title: 'Quốc tế' }} />
    </tabs.Navigator>
  )
}

export default HomeNewReleaseTopTabNavigator
