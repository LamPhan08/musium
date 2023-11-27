import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/colors';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: COLORS.bottomTabBar,
          height: 70,
          paddingBottom: 15,
          paddingTop: 10
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Mulish-Bold'
        }
      }}
      initialRouteName='Explore'>
      <Tab.Screen name='Explore' component={Home} options={{
        tabBarIcon: ({ focused }) => <AntDesign name='home' size={26} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Khám phá',

      }} />
      {/* <Tab.Screen name='Favorites' component={Explore} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='heart-outline' size={26} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Yêu thích'
      }} /> */}
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='person-outline' size={26} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Cá nhân'
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
