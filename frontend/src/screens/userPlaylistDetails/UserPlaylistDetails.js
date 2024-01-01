import React, { useRef, useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, ImageBackground, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import logo from '../../../assets/images/logo.png'
import avatar from '../../../assets/images/avatar.png'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './userPlaylistDetails.style'
import { useDispatch, useSelector } from 'react-redux'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'
import TrackPlayer from 'react-native-track-player'
import { setSongList } from '../../redux/songSlice'
import { COLORS } from '../../constants/colors'
import PlaylistBottomSheet from '../../components/playlistBottomSheet/PlaylistBottomSheet'
import { getSpecificPlaylist } from '../../api/playlist'
import { useFocusEffect } from '@react-navigation/native';
import UserPlaylistSongCard from '../../components/userPlaylistSongCard/UserPlaylistSongCard'

const { width } = Dimensions.get('window')

const UserPlaylistDetails = ({ navigation, route }) => {
  const {user} = useSelector(state => state.song)

  const { playlist, userId } = route.params
  const [playlistData, setPlaylistData] = useState(playlist)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [focus, setFocus] = useState(false)
  const [songs, setSongs] = useState()

  const dispatch = useDispatch()

  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [width * 0.5, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [width * 0.65, width * 0.3],
    extrapolate: 'clamp',
  })

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  const handlePlay = async () => {
    const queue = EditArrayForTrackPlayer(songs)

    dispatch(setSongList(queue))

    await TrackPlayer.setQueue(queue)

    await TrackPlayer.skip(0)

    TrackPlayer.play()
  }

  const handleNavigateSearchSongs = () => {
    navigation.navigate('SearchSongs', {songs: songs})
  }

  const loadData = async () => {
    const result = await getSpecificPlaylist(userId, playlist._id)

     setPlaylistData(result)

     if (result.songs.length !== 0) {
      setSongs(await CheckSongHasMp3(result.songs));
    }
    else {
      setSongs([])
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [])
  )

  

  return (
    <ImageBackground
      source={playlistData.songs.length !== 0
        ? { uri: playlistData.songs[0].thumbnailM }
        : null
      }
      style={styles.playerDetailsContainer}
      resizeMode='cover'
      blurRadius={15}
    >
      <View
        style={[
          styles.darkView,
          {
            backgroundColor: playlistData.songs.length !== 0
              ? 'rgba(0, 0, 0, 0.5)'
              : 'transparent'
          }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name='chevron-thin-left' style={styles.headerIcon} />
          </TouchableOpacity>

          <Animated.View style={[styles.animatedView, { opacity: opacity }]}>
            <Text style={styles.playlistHeaderTitle} numberOfLines={1}>{playlistData?.title}</Text>
          </Animated.View>

          <TouchableOpacity onPress={() => setShowBottomSheet(!showBottomSheet)}>
            <Feather name='more-vertical' style={styles.headerIcon} />
          </TouchableOpacity>
        </View>

        {songs
          ? <ScrollView
            showsVerticalScrollIndicator={false}
            decelerationRate='fast'
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{paddingBottom: 10}}
          >
            <View style={styles.playlistIn4Wrapper}>
              <Animated.Image
                source={playlistData.songs.length !== 0
                  ? { uri: playlistData.songs[0].thumbnailM }
                  : logo
                }
                style={[
                  styles.playlistThumbnail,
                  {
                    width: imageSize, height: imageSize
                  }]} />

              <Text style={styles.playlistTitle}>{playlistData.title}</Text>

              <View style={styles.userWrapper}>
                <Image source={{uri: user.photo}} style={styles.avatar} />

                <Text style={styles.username}>{playlistData.creator === 'musium' ? 'musium' : user.username}</Text>

                {playlistData.songs.length !== 0 &&
                  <TouchableOpacity onPress={handlePlay} style={styles.playBtn}>
                    <Ionicons name='play' style={styles.playIcon} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            {playlistData.songs.length !== 0
              ?
              <View style={styles.songListWrapper}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.playlistSongTotal}>{playlistData.songs.length} bài</Text>

                  <TouchableOpacity onPress={handleNavigateSearchSongs}>
                    <Ionicons name='search' style={styles.searchIcon} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={styles.songList}
                  data={songs}
                  initialNumToRender={20}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={50}
                  windowSize={20}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => {
                    return (
                      <UserPlaylistSongCard 
                      song={item} 
                      key={index} 
                      playlistSongs={EditArrayForTrackPlayer(songs)} 
                      index={index} 
                      loadData={loadData} 
                      playlistId={playlist._id}/>
                    )
                  }}
                />
              </View>
              :
              <View style={styles.noSongsWrapper}>
                <Ionicons name='musical-notes-outline' style={styles.musicIcon} />

                <Text style={styles.noSongs}>Chưa có bài hát!</Text>
              </View>
            }
          </ScrollView>

          : <View style={styles.loadingContainer}>
            <ActivityIndicator
              size='large'
              color={playlistData.songs.length !== 0
                ? COLORS.white
                : COLORS.primary
              } />
          </View>
        }
      </View>

      <PlaylistBottomSheet
        navigation={navigation}
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        playlist={playlistData}
        userId={userId}
      />
    </ImageBackground>
  )
}

export default UserPlaylistDetails
