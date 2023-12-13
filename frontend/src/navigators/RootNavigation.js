import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Splash from '../screens/splash/Splash';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import Search from '../screens/search/Search';
import EditProfile from '../screens/editprofilescreen/EditProfile'
import PlayerDetails from '../screens/playerDetails/PlayerDetails';
import { useDispatch } from 'react-redux';
import { setSong, setPlayerState } from '../redux/songSlice';
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const dispatch = useDispatch()

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async event => {
        // if (event.type === Event.PlaybackTrackChanged && event.nextTrack === null) {
        //     TrackPlayer.skip(0)
        //     TrackPlayer.play()
        // }
        let trackObject

        const trackIndex = await TrackPlayer.getCurrentTrack()
        if (trackIndex !== null) {
            trackObject = await TrackPlayer.getTrack(trackIndex)
        }

        if (event.state === 'playing' || event.state === 'paused' ) {
            dispatch(setPlayerState(event.state))
        }

        dispatch(setSong(trackObject))

    })

    // useEffect(() => {
    //     (
    //         async () => {
    //             let trackObject

    //             const trackIndex = await TrackPlayer.getCurrentTrack()

    //             if (trackIndex !== null) {
    //                 trackObject = await TrackPlayer.getTrack(trackIndex)
    //             }
                
    //             dispatch(setSong(trackObject))
    //         }
    //     )()
    // }, [])

    return (
        <Stack.Navigator
            initialRouteName='App'
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
            }} />
            <Stack.Screen name='PlayerDetails' component={PlayerDetails} options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
            }} />

        </Stack.Navigator>
    )
}

export default RootNavigation
