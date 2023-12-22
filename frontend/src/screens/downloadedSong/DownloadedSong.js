import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Image, ScrollView, Text, View, TouchableOpacity, Pressable, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './downloaded.style'
import { COLORS } from '../../constants/colors';
import SearchBar from '../../components/searchBar/SearchBar';
import SongItem from '../../components/songItem/SongItem';
import { tracks } from '../../../assets/data/tracks';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const DownloadedSong = ({ navigation }) => {
  const [searchText, setSearchText] = useState("")
  const [focus, setFocus] = useState(false)

  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}  >
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center", padding: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10, flex: 1 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>



        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.label}>Đã tải</Text>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <SearchBar searchText={searchText} setSearchText={setSearchText} setFocus={setFocus}/>
        </View>


        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent:"center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 20,
              marginTop: 10,
              flex: 1
            }}
          >
            Các bài hát đã tải
          </Text>

          <TouchableOpacity
          style={{marginHorizontal: 40,
            marginTop: 15,}}>
          
          <FontAwesome
                name="random"
                size={24}
                color="#06A0B5"
              />
              </TouchableOpacity>
        </View>


        <View style={{ padding: 15 }}>
          {tracks.map((item, index) => {
            return (
              <SongItem item={item} key={index} />
            )
          })}
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default DownloadedSong