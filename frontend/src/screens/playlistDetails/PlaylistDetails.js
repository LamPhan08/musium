import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList, Animated, Dimensions } from 'react-native'
import styles from './playlistDetails.style'
import { getPlaylistDetails } from '../../api/getData'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../../constants/colors'
import ConvertTimestamp from '../../utils/convertTimestamp'
import SongCard from '../../components/songCard/SongCard'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import TrackPlayer from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { setSongList } from '../../redux/songSlice'

const {width} = Dimensions.get('window')

const PlaylistDetails = ({ navigation, route }) => {
  const { playlistId, playlistTitle, playlistThumbnail } = route.params
  const [playlistData, setPlaylistData] = useState()
  const [playlistSong, setPlaylistSong] = useState()
  const [isLiked, setIsLiked] = useState(false)

  // console.log(playlistData)

  const dispatch = useDispatch()

  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [220, 500],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [width * 0.65, width * 0.3],
    extrapolate: 'clamp',
  })

  useEffect(() => {
    (
      async () => {
        const result = await getPlaylistDetails(playlistId)

        setPlaylistData(result)

        setPlaylistSong(await CheckSongHasMp3(result.song.items, 'none'))
      }
    )()
  }, [])


  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleHeaderPlay = async () => {
    if (scrollY._value > 220) {
      await handlePlay()
    }
  }

  const handlePlay = async () => {
    const queue = EditArrayForTrackPlayer(playlistSong)

    dispatch(setSongList(queue))

    await TrackPlayer.setQueue(queue)

    await TrackPlayer.skip(0)

    TrackPlayer.play()
  }

  const handleViewArtist = (artist) => {

  }

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  return (
    <ImageBackground style={styles.playlistDetailsContainer} source={{ uri: playlistThumbnail }} resizeMode='cover' blurRadius={15}>
      <View style={styles.darkView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name='chevron-thin-left' style={styles.headerIcon} />
          </TouchableOpacity>

          <Animated.View style={[styles.animatedView, {opacity: opacity}]}>
            <Text style={styles.playlistHeaderTitle}>{playlistTitle}</Text>

            <TouchableOpacity style={styles.playHeaderButton} onPress={handleHeaderPlay}>
              <Ionicons name='play' style={styles.playBtnIcon} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {playlistData && playlistSong
          ?
          <ScrollView
            showsVerticalScrollIndicator={false}
            decelerationRate='fast'
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View style={styles.playlistIn4Wrapper}>
              <Animated.Image source={{ uri: playlistData.thumbnailM }} style={[styles.playlistThumbnail, {width: imageSize, height: imageSize}]} />

              <Text style={styles.playlistTitle}>{playlistData.title}</Text>

              <View style={styles.artistsNamesWrapper}>
                <Text style={styles.artistsPlaylist}>Playlist của </Text>

                {playlistData.artists.map((artist, index) => {
                  return (
                    <View key={index} style={styles.artistBtn} >
                      <TouchableOpacity onPress={() => handleViewArtist(artist)}>
                        <Text style={styles.artistName}>{artist.name}</Text>
                      </TouchableOpacity>

                      {index < playlistData.artists.length - 1 && <Text style={styles.artistName}>, </Text>}
                    </View>
                  )
                })}
              </View>

              <View style={styles.lastUpdateAndListen}>
                <Text style={styles.playlistLastUpdate}>Cập nhật: {ConvertTimestamp(playlistData.contentLastUpdate)}</Text>

                <View style={styles.listenWrapper}>
                  <Feather name='headphones' style={styles.headphoneIcon} />

                  <Text style={styles.listen}>{playlistData.listen}</Text>
                </View>
                {/* <View style={styles.listenWrapper}>
                  <Feather name='headphones' style={styles.headphoneIcon}/>

                  <Text>{playlistData.like}</Text>
                </View> */}
              </View>

              {playlistData.description !== '' && <Text style={styles.playlistDescription}>{playlistData.description}</Text>}

              <View style={styles.btnWrapper}>
                <Text style={styles.playlistSongTotal}>{playlistSong.length} bài</Text>

                <TouchableOpacity onPress={handlePlay} style={styles.playBtn}>
                  <Ionicons name='play' style={styles.icon} color={COLORS.white} />

                  <Text style={styles.btnText}>Phát</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLike}>
                  {isLiked
                    ? <Ionicons name='heart' style={styles.icon} color={COLORS.primary} />
                    : <Ionicons name='heart-outline' style={styles.icon} color={COLORS.white} />
                  }
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              style={styles.songList}
              data={playlistSong}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              windowSize={20}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                return (
                  <SongCard song={item} key={index} playlistSongs={EditArrayForTrackPlayer(playlistSong)} index={index}/>
                )
              }}
            />
          </ScrollView>
          :
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={COLORS.white} />
          </View>
        }
      </View>
    </ImageBackground>
  )


}

export default PlaylistDetails
