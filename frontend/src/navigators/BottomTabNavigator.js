import React, {useState, useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/explore/Explore';
import Profile from '../screens/profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/colors';
import Favorites from '../screens/favorites/Favorites';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import Player from '../components/player/Player';
import { useSelector } from 'react-redux';

import { Scaler, ZoomScaler } from '../../utils/zoomInOut';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { song } = useSelector(state => state.song)
  const [routeName, setRouteName] = useState('Explore')

  const animateScale = new Animated.Value(0)
  const animateIcon = new Animated.Value(0)

  const interpolateView = animateScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const interpolateIcon = animateIcon.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 2, 1]
  })

  const animateTabOpen = () => {
    animateScale.setValue(0)
    animateIcon.setValue(0)

    Animated.parallel([
      Animated.timing(animateScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear
      }),

      Animated.timing(animateIcon, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear
      }),
    ]).start()
  }

  useEffect(() => {
    animateTabOpen()
  }, [routeName])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName='Explore'
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View>
            {Object.keys(song).length !== 0 ? <Player /> : null}

            <View style={{ flexDirection: 'row', backgroundColor: COLORS.bottomTabBar, height: 60, alignItems: 'center',  }}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.name;


                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  setRouteName(route.name)
                  
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                  
                };

                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    key={index}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flex: 1, alignItems: 'center', height: 60, justifyContent: 'center'}}
                  >


                    {isFocused && 
                      <Animated.View 
                        style={{
                          height: 50, 
                          width: 50, 
                          position: 'absolute',
                          // top: 0,
                          borderRadius: 100, 
                          backgroundColor: isFocused ? COLORS.primary : null, 
                          transform: [{scale: interpolateView}]
                        }}/>
                    }

                    <Animated.View style={isFocused ? {transform: [{scale: interpolateIcon}]} : ''}>
                      <ZoomScaler pose={isFocused ? "active" : "inactive"}>
                      {options.tabBarIcon({ focused: isFocused})}
                      </ZoomScaler>
                    </Animated.View>

                    {/* {isFocused && <Text style={{ color: isFocused ? COLORS.white : COLORS.grey, fontFamily: 'Mulish-Bold', fontSize: 10 }}>
                      {label}
                    </Text>} */}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )
      }}
    >
      {/* <Tab.Screen name='Explore' component={Home} options={{
        tabBarIcon: ({ focused }) => <AntDesign name='home' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Khám phá',

      }} />
      <Tab.Screen name='Favorites' component={Favorites} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='heart-outline' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Yêu thích',
      }} /> */}
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='person-outline' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Cá nhân'
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
