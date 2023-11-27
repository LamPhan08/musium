import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Splash from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='App'
            screenOptions={{
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'

            }}
        >
            <Stack.Screen name="App" component={BottomTabNavigator} />
            <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
    )
}

export default RootNavigation
