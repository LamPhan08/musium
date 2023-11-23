import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigators/RootNavigation';

function App() {
  return (
      <NavigationContainer>
        <RootNavigation/>
      </NavigationContainer>
  );
}

export default App;
