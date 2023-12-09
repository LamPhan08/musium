import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Splash from '../screens/splash/Splash';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import Search from '../screens/search/Search';
import EditProfile from '../screens/editprofilescreen/EditProfile'
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_right'

            }}
        >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="App" component={BottomTabNavigator} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Search" component={Search} options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
            }}/>
            
        </Stack.Navigator>
    )
}

export default RootNavigation
