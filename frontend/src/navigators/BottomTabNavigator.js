import React from 'react'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/colors';
import Favorites from '../screens/favorites/Favorites';
import { View } from 'react-native';
import Player from '../components/player/Player';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { song } = useSelector(state => state.song)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: COLORS.bottomTabBar,
          height: 50,
          paddingBottom: 5,
          paddingTop: 5
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Mulish-Bold'
        }
      }}
      initialRouteName='Explore'
      tabBar={(props) => {
        return (
          <View>
            {Object.keys(song).length !== 0 ? <Player /> : null}

            <BottomTabBar {...props} />
          </View>
        )
      }}
    >
      <Tab.Screen name='Explore' component={Home} options={{
        tabBarIcon: ({ focused }) => <AntDesign name='home' size={20} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Khám phá',

      }} />
      <Tab.Screen name='Favorites' component={Favorites} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='heart-outline' size={20} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Yêu thích'
      }} />
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='person-outline' size={20} color={focused ? COLORS.primary : COLORS.white} />,
        title: 'Cá nhân'
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
