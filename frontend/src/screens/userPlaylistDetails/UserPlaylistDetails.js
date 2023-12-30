import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, ImageBackground, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import logo from '../../../assets/images/logo.png'
import avatar from '../../../assets/images/avatar.png'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './userPlaylistDetails.style'
import { useDispatch } from 'react-redux'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'
import TrackPlayer from 'react-native-track-player'
import { setSongList } from '../../redux/songSlice'
import { COLORS } from '../../constants/colors'
import PlaylistBottomSheet from '../../components/playlistBottomSheet/PlaylistBottomSheet'

const { width } = Dimensions.get('window')

const UserPlaylistDetails = ({ navigation, route }) => {
  const { playlist, userId } = route.params
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [songs, setSongs] = useState([])

  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [width * 0.5, 500],
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
    const queue = EditArrayForTrackPlayer(playlist.songs)

    dispatch(setSongList(queue))

    await TrackPlayer.setQueue(queue)

    await TrackPlayer.skip(0)

    TrackPlayer.play()
  }

  const handleNavigateSearchSongs = () => {

  }

  const loadData = async () => {

  }



  return (
    <ImageBackground
      source={playlist.songs.length !== 0
        ? { uri: playlist.songs[0].thumbnailM }
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
            backgroundColor: playlist.songs.length !== 0
              ? 'rgba(0, 0, 0, 0.5)'
              : 'transparent'
          }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name='chevron-thin-left' style={styles.headerIcon} />
          </TouchableOpacity>

          <Animated.View style={[styles.animatedView, { opacity: opacity }]}>
            <Text style={styles.playlistHeaderTitle} numberOfLines={1}>{playlist?.title}</Text>
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
          >
            <View style={styles.playlistIn4Wrapper}>
              <Animated.Image
                source={playlist.songs.length !== 0
                  ? { uri: playlist.songs[0].thumbnailM }
                  : logo
                }
                style={[
                  styles.playlistThumbnail,
                  {
                    width: imageSize, height: imageSize
                  }]} />

              <Text style={styles.playlistTitle}>{playlist.title}</Text>

              <View style={styles.userWrapper}>
                <Image source={avatar} style={styles.avatar} />

                <Text style={styles.username}>{playlist.creator}</Text>

                {playlist.songs.length !== 0 &&
                  <TouchableOpacity onPress={handlePlay} style={styles.playBtn}>
                    <Ionicons name='play' style={styles.playIcon} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            {playlist.songs.length !== 0
              ?
              <View style={styles.songListWrapper}>
                <View style={styles.btnWrapper}>
                  <Text style={styles.playlistSongTotal}>{playlist.songs.length} bài</Text>

                  <TouchableOpacity onPress={handleNavigateSearchSongs}>
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

                <Text style={styles.noSongs}>Chưa có bài hát!</Text>
              </View>
            }
          </ScrollView>

          : <View style={styles.loadingContainer}>
            <ActivityIndicator
              size='large'
              color={playlist.songs.length !== 0
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
        playlist={playlist}
        userId={userId}
      />
    </ImageBackground>
  )
}

export default UserPlaylistDetails
