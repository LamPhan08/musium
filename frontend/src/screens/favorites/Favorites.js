
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useCallback, useRef } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { tracks } from '../../../assets/data/tracks';
import SongItem from '../../components/songItem/SongItem';
import { COLORS } from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient'
import styles from './favorites.style'
import { useSelector } from 'react-redux';
import { getFavoriteSongs } from '../../api/favoriteSongs';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import avatar from '../../../assets/images/avatar.png'
import favorite from '../../../assets/images/favorite.png'
import SongCard from '../../components/songCard/SongCard';
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer';
import CheckSongHasMp3 from '../../utils/checkSongHasMp3';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { setSongList } from '../../redux/songSlice';

const Favorites = ({ navigation }) => {
  const [favoriteSongs, setFavoriteSongs] = useState();

  const { user } = useSelector(state => state.song);
  const dispatch = useDispatch()

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', COLORS.headerBlack],
    extrapolate: 'clamp'
  })

  const loadData = async () => {
    const result = await getFavoriteSongs(user._id);

    if (Object.keys(result).length !== 0) {
      setFavoriteSongs(await CheckSongHasMp3(result.songs));
    }
    else {
      setFavoriteSongs([])
    }
  }



  const handlePlay = async () => {
    const queue = EditArrayForTrackPlayer(favoriteSongs)

    dispatch(setSongList(queue))

    await TrackPlayer.setQueue(queue)

    await TrackPlayer.skip(0)

    TrackPlayer.play()
  }

  const handleNavigateSearchFavorites = () => {
    navigation.navigate('SearchFavoriteSongs', { favoriteSongs })
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.favoriteSongsContainer}>
      <Animated.View style={[styles.header, { opacity: opacity, backgroundColor: headerBackgroundColor }]}>
        <Text style={styles.headerText}>Bài hát đã thích</Text>
      </Animated.View>

      {favoriteSongs ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          decelerationRate={'fast'}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable> */}

          {/* <Pressable style={{
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
          </Pressable> */}

          {/* <SearchBar
            searchText={input}
            setSearchText={setInput}
            setFocus={setFocus}
            handleFind={handleFind}
          /> */}

          {/* <View >
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
          </Pressable> */}


          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={tracks}
            renderItem={({ item }) => (
              <SongItem
                item={item}
              />
            )}
          /> */}
          {/* <View style={{ paddingBottom: 20 }}>
            {tracks.map((item, index) => {
              return (
                <SongItem item={item} key={index} />
              )
            })}
          </View> */}


          <ImageBackground
            source={favoriteSongs.length !== 0
              ? { uri: favoriteSongs[0].thumbnailM }
              : favorite
            }
            style={styles.imageBackground}
            blurRadius={5}
          >
            <LinearGradient colors={['transparent', COLORS.background]} style={styles.linearWrapper}>
              <ImageBackground
                source={favoriteSongs.length !== 0
                  ? { uri: favoriteSongs[0].thumbnailM }
                  : favorite
                }
                borderRadius={5}
                style={styles.favoritesThumbnail}
              >
                <Ionicons name='heart' style={styles.heartIcon} />
              </ImageBackground>

              <View style={styles.favoritesTileWrapper}>
                <Text style={styles.favoritesTitle}>Bài hát đã thích</Text>

                <View style={styles.userWrapper}>
                  <Image source={avatar} style={styles.avatar} />

                  <Text style={styles.username}>{user.username}</Text>

                  {favoriteSongs.length !== 0 &&
                    <TouchableOpacity onPress={handlePlay} style={styles.playBtn}>
                      <Ionicons name='play' style={styles.playIcon} />
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>

          {favoriteSongs.length !== 0
            ?
            <View style={styles.songListWrapper}>
              <View style={styles.btnWrapper}>
                <Text style={styles.playlistSongTotal}>{favoriteSongs.length} bài</Text>

                <TouchableOpacity onPress={handleNavigateSearchFavorites}>
                  <Ionicons name='search' style={styles.searchIcon} />
                </TouchableOpacity>
              </View>

              <FlatList
                style={styles.songList}
                data={favoriteSongs}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                windowSize={20}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                  return (
                    <SongCard song={item} key={index} playlistSongs={EditArrayForTrackPlayer(favoriteSongs)} index={index} loadData={loadData} />
                  )
                }}
              />
            </View>
            :
            <View style={styles.noSongsWrapper}>
              <Ionicons name='musical-notes-outline' style={styles.musicIcon} />

              <Text style={styles.noSongs}>Không có bài hát!</Text>
            </View>
          }
        </ScrollView>

        :
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      }
    </SafeAreaView>
  )
}

export default Favorites