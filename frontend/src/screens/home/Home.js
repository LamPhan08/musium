import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants/colors'

const Home = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <Text>Home</Text>
    </View>
  )
}

export default Home
