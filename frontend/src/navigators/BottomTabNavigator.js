import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Explore from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../constants/colors';
import Favorites from '../screens/favorites/Favorites';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#000',
          height: 70,
          paddingBottom: 15,
          paddingTop: 10
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Mulish-Bold'
        }
      }}
      initialRouteName='Home'>
      <Tab.Screen name='Home' component={Home} options={{
        tabBarIcon: ({ focused }) => <AntDesign name='home' size={24} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Home',

      }} />
      <Tab.Screen name='Explore' component={Favorites} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='search' size={24} color={focused ? COLORS.primary : COLORS.white} />,
        headerLeft: () => (
          <Text style={{ marginLeft: 20, fontSize: 20, color: '#000', fontWeight: 'bold' }}>Matches</Text>
        ),
      }} />
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='person-outline' size={24} color={focused ? COLORS.primary : COLORS.white} />,
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
