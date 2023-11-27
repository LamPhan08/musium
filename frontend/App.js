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
import AuthStack from './src/navigators/AuthStack';
import Favorites from './src/screens/favorites/Favorites';

function App() {
  return (
      <NavigationContainer>
        {/* <Favorites></Favorites> */}

       <RootNavigation/>
       
      </NavigationContainer>
  );
}

export default App;
