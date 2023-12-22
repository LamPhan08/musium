import React, { useState, useEffect } from 'react'
import SearchBar from '../../components/searchBar/SearchBar';
import { Image, ScrollView, Text, View, TouchableOpacity, Pressable, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { getAll, getAlbums, searchSongs, SortSongFields, SortSongOrder } from "react-native-get-music-files";
const LocalAudio = ({navigation}) => {
  const [findSong, setFindSong] = useState("")
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    const getMusicFiles = async () => {
      try {
        const allMusic = await getAll({
          id: true,
          artist: true,
          duration: true, // additional options
          cover: true,
          genre: true,
          title: true,
          fileName: true,
          minimumSongDuration: 10000, // milliseconds
        });

        console.log('All Music Files:', allMusic);
      } catch (error) {
        console.error('Error getting music files:', error);
      }
    };

    // Call the function to get music files
    getMusicFiles();
  }, []);
  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", padding: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10, flex: 1 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>



        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.label}>Nhạc trong thư viện</Text>
        </View>

        <SearchBar
          searchPhrase={findSong}
          setSearchPhrase={setFindSong}
          clicked={clicked}
          setClicked={setClicked}
        />


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
            Các bài hát có sẵn
          </Text>
        </View>


        <View style={{ padding: 15 }}>
            
        </View>
    </LinearGradient>
  )
}

export default LocalAudio