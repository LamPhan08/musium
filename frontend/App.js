import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigators/RootNavigation';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { store } from './src/redux/store'
import { Provider } from 'react-redux';

function App() {
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()

    TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        // Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
    });
  }

  setupPlayer()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
