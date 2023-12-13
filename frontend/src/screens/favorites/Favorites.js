
import styles from './favorites.style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect, useContext, useRef } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import { tracks } from '../../../assets/data/tracks';
import SongItem from '../../components/songItem/SongItem';
import { COLORS } from '../../constants/colors';

const Favorites = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={["#121111", "#040306"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingTop: 20,}} showsVerticalScrollIndicator={false} decelerationRate={'fast'}>
          {/* <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable> */}

          <Pressable style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10
          }}>
            <Pressable style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: COLORS.grey,
              padding: 9,
              flex: 1,
              borderRadius: 3,
              height: 38,
            }}>
              <Ionicons name="search" size={20} color="black" />
              <TextInput
                placeholder='Find songs'
                placeholderTextColor={"black"}
                style={{ fontWeight: "500", color: "black" }}
              />

            </Pressable>
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Mulish-ExtraBold', color: "white" }}>
              Bài hát đã thích
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5, fontFamily: 'Mulish-Regular' }}>
              430 songs
            </Text>
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#06A0B5",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FontAwesome
                name="random"
                size={24}
                color="#06A0B5"
              />
              <Pressable

                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#06A0B5",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

        
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={tracks}
            renderItem={({ item }) => (
              <SongItem
                item={item}
              />
            )}
          /> */}
          <View style={{paddingBottom: 20}}>
          {tracks.map((item, index) => {
            return (
              <SongItem item={item} key={index}/>
            )
          })}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Favorites