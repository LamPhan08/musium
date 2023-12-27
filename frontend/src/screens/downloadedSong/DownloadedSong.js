import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Image, ScrollView, Text, View, TouchableOpacity, Pressable, TextInput, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './downloaded.style'
import { COLORS } from '../../constants/colors';
import SearchBar from '../../components/searchBar/SearchBar';
import SongItem from '../../components/songItem/SongItem';
import { tracks } from '../../../assets/data/tracks';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { getAll, getAlbums, searchSongs, SortSongFields, SortSongOrder } from "react-native-get-music-files";
import StorageAudio from '../../components/storageAudio/StorageAudio';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadedSong = ({ navigation }) => {
  const [searchText, setSearchText] = useState("")
  const [focus, setFocus] = useState(false)
  const [music, setMusic] = useState([])
  useEffect(() => {
    const getMusicFiles = async () => {
      try {
        const allMusic = await getAll({
          limit: 100,
          offset: 0,
          coverQuality: 50,
          minSongDuration: 1000,
          sortBy: SortSongFields.TITLE,
          sortOrder: SortSongOrder.DESC,
        });
        // console.log(allMusic)
        const songs = await allMusic.filter(song => song.url.endsWith('.mp3'))
        // console.log('All Music Files:', song s);
        setMusic(songs)
      } catch (error) {
        console.error('Error getting music files:', error);
      }
    };
    getMusicFiles();
  }, []);


  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }} >
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

        <View style={{ paddingHorizontal: 15 }}>
          <SearchBar searchText={searchText} setSearchText={setSearchText} setFocus={setFocus} />
        </View>


        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
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
            style={{
              marginHorizontal: 40,
              marginTop: 15,
            }}>

            <FontAwesome
              name="random"
              size={24}
              color="#06A0B5"
            />
          </TouchableOpacity>
        </View>


        <View style={{ padding: 15 }}>
          {music.map((item, index) => {
            return (
              <StorageAudio item={item} key={index} />
            )
          })}
        </View>

      </ScrollView>
    </LinearGradient>
  )

  // const [findSong, setFindSong] = useState("")
  // const [clicked, setClicked] = useState(false);
  // const [music, setMusic] = useState()

  // useEffect(() => {
  //   const getMusicFiles = async () => {
  //     try {
  //       const allMusic = await getAll({
  //         id: true,
  //         artist: true,
  //         duration: true, // additional options
  //         cover: true,
  //         genre: true,
  //         title: true,
  //         fileName: true,
  //         minimumSongDuration: 10000, // milliseconds
  //       });
  //       const songs = await allMusic.filter(song => song.url.endsWith('.mp3'))
  //       console.log('All Music Files:', songs);
  //       setMusic(songs)
  //     } catch (error) {
  //       console.error('Error getting music files:', error);
  //     }
  //   };

  //   // Call the function to get music files
  //   getMusicFiles();
  // }, []);
  // return (
  //   <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}>
  //       <View style={{ flexDirection: "row", justifyContent: "center", padding: 5 }}>
  //         <TouchableOpacity
  //           onPress={() => navigation.goBack()}
  //           style={{ marginHorizontal: 10, flex: 1 }}
  //         >
  //           <Ionicons name="arrow-back" size={24} color="white" />
  //         </TouchableOpacity>
  //       </View>



  //       <View style={{ flexDirection: "row", justifyContent: "center" }}>
  //         <Text style={styles.label}>Nhạc trong thư viện</Text>
  //       </View>

  //       <SearchBar
  //         searchPhrase={findSong}
  //         setSearchPhrase={setFindSong}
  //         clicked={clicked}
  //         setClicked={setClicked}
  //       />


  //       <View style={{ flexDirection: 'row', alignItems: "center", justifyContent:"center" }}>
  //         <Text
  //           style={{
  //             color: "white",
  //             fontSize: 20,
  //             fontWeight: "500",
  //             marginHorizontal: 20,
  //             marginTop: 10,
  //             flex: 1
  //           }}
  //         >
  //           Các bài hát đã tải
  //         </Text>
  //       </View>


  //       <View style={{ padding: 15 }}>
  //       <FlatList
  //           showsVerticalScrollIndicator={false}
  //           data={music}
  //           renderItem={({ item }) => (
  //             <StorageAudio
  //               item={item}
  //             />
  //           )}
  //         /> 
  //       </View>
  //   </LinearGradient>
  // )
}

export default DownloadedSong