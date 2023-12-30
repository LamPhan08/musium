import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/profile/Profile';
import Favorites from '../screens/favorites/Favorites';
import Explore from '../screens/explore/Explore';
import Search from '../screens/search/Search';
import PlaylistDetails from '../screens/playlistDetails/PlaylistDetails';
import ArtistInformation from '../screens/artistInformation/ArtistInformation';
import SearchFavoriteSongs from '../screens/searchFavoriteSongs/SearchFavoriteSongs';
import Player from '../components/player/Player';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { ZoomScaler } from '../utils/zoomInOut';
import { useFocusEffect } from '@react-navigation/native';
import { setBottomTabRouteName } from '../redux/songSlice';

const Tab = createBottomTabNavigator();
const TabStack = createNativeStackNavigator()

const ExploreStack = () => {
  return (
    <TabStack.Navigator
      initialRouteName='Explore'
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabStack.Screen name='Explore' component={Explore} />
      <TabStack.Screen name="Search" component={Search} options={{
        presentation: 'modal',
        animation: 'slide_from_bottom'
      }} />
      <TabStack.Screen name="PlaylistDetails" component={PlaylistDetails} options={{
        presentation: 'modal',
        animation: 'slide_from_right'
      }} />
      <TabStack.Screen name='ArtistInformation' component={ArtistInformation} options={{
        presentation: 'modal',
        animation: 'slide_from_right'
      }} />
    </TabStack.Navigator>
  )
}

const FavoritesStack = () => {
  return (
    <TabStack.Navigator
      initialRouteName='Favorites'
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabStack.Screen name='Favorites' component={Favorites} />
      <TabStack.Screen name="SearchFavoriteSongs" component={SearchFavoriteSongs} options={{
        presentation: 'modal',
        animation: 'slide_from_bottom'
      }} />
    </TabStack.Navigator>
  )
}

const BottomTabNavigator = ({ navigation }) => {
  const { song, bottomTabRouteName } = useSelector(state => state.song)
  const dispatch = useDispatch();

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



  // useEffect(() => {
  //   animateTabOpen()
  // }, [routeName])
  useEffect(() => {
    animateTabOpen();
  }, [bottomTabRouteName])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      backBehavior='none'
      initialRouteName='Profile'
      tabBar={({ state, descriptors, navigation }) => {

        return (
          <View style={{ backgroundColor: COLORS.bottomTabBar }}>
            {song ? <Player navigation={navigation} /> : null}

            <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 60, alignItems: 'center', }}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                // const label =
                //   options.tabBarLabel !== undefined
                //     ? options.tabBarLabel
                //     : options.title !== undefined
                //       ? options.title
                //       : route.name;


                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  dispatch(setBottomTabRouteName(route.name))

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
                    style={{ flex: 1, alignItems: 'center', height: 60, justifyContent: 'center' }}
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
                          transform: [{ scale: interpolateView }]
                        }} />
                    }

                    <Animated.View style={isFocused ? { transform: [{ scale: interpolateIcon }] } : ''}>
                      <ZoomScaler pose={isFocused ? "active" : "inactive"}>
                        {options.tabBarIcon({ focused: isFocused })}
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
      <Tab.Screen name='ExploreStack' component={ExploreStack} options={{
        tabBarIcon: ({ focused }) => <AntDesign name='home' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Khám phá',

      }} />
      <Tab.Screen name='FavoritesStack' component={FavoritesStack} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='heart-outline' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Yêu thích',
      }} />
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => <Ionicons name='person-outline' size={23} color={focused ? COLORS.white : COLORS.grey} />,
        title: 'Cá nhân'
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
