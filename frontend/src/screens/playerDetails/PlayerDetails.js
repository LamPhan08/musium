import React, { useState, useRef, memo, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import PlayerDetailsTabView from '../../navigators/PlayerDetailsTabView'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState, setShuffledSongList } from '../../redux/songSlice'
import styles from './playerDetails.style'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress, usePlaybackState, RepeatMode } from 'react-native-track-player'
import formatDuration from '../../utils/formatDuration'
import { COLORS } from '../../constants/colors'
import LottieView from 'lottie-react-native'
import playPauseAnimation from '../../../assets/images/PlayPauseAnimation.json'
import OptionsBottomSheet from '../../components/optionsBottomSheet/OptionsBottomSheet'
import PlaylistListModal from '../../components/playlistListModal/PlaylistListModal'
import { getFavoriteSongs } from '../../api/favoriteSongs'
import { Shuffle } from '../../utils/shuffle'
import logo from '../../../assets/images/logo.png'

const PlayerDetails = ({ navigation }) => {
  const { song, songList, playerState, user, shuffledSongList } = useSelector(state => state.song)

  const [title, setTitle] = useState('Đang phát')
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(shuffledSongList.length !== 0 ? true : false)
  const [openPlaylist, setOpenPlaylist] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const dispatch = useDispatch()

  const progress = useProgress()
  const playbackState = usePlaybackState()
  const animationRef = useRef()

  const onTitleChange = (value) => {
    setTitle(value)
  }

  const handlePlayPauseMusic = () => {
    if (playbackState.state === 'paused') {
      // dispatch(setAnimationStart(true))
      animationRef.current?.play(0, 25)

      TrackPlayer.play()
    }
    else if (playbackState.state === 'playing') {
      // dispatch(setAnimationStart(false))
      animationRef.current?.play(35, 60)

      TrackPlayer.pause()
    }
    else if (playbackState.state === 'ended') {
      animationRef.current?.play(0, 25)

      TrackPlayer.seekTo(0)
    }
  }

  const handleSkipToPrevious = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack()

    if (trackIndex === 0) {
      TrackPlayer.skip(songList.length - 1)
    }
    else {
      TrackPlayer.skipToPrevious()
    }

    dispatch(setPlayerState('playing'))

    if (playbackState.state !== 'playing') {

      TrackPlayer.play()
    }
  }

  const handleSkipToNext = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack()

    if (trackIndex === songList.length - 1) {
      TrackPlayer.skip(0)
    }
    else {
      TrackPlayer.skipToNext()
    }

    dispatch(setPlayerState('playing'))

    if (playbackState.state !== 'playing') {

      TrackPlayer.play()
    }

  }

  const handleSeek = (timestamp) => {
    TrackPlayer.seekTo(timestamp)

    TrackPlayer.play()
  }

  // console.log(shuffledSongList)
  const handleShuffle = async () => {
    // setShuffle(!shuffle)
    if (shuffle) {
      const indexInNewQueue = songList.findIndex(track => track.id === song.id)
      const currentProgress = progress.position;

      await TrackPlayer.setQueue(songList)

      await TrackPlayer.skip(indexInNewQueue)

      TrackPlayer.seekTo(currentProgress)

      dispatch(setShuffledSongList([]))

      setShuffle(false)
    }
    else {
      const shuffledList = Shuffle(await TrackPlayer.getQueue())

      const indexInNewQueue = shuffledList.findIndex(track => track.id === song.id)
      const currentProgress = progress.position;

      await TrackPlayer.setQueue(shuffledList)

      await TrackPlayer.skip(indexInNewQueue)

      TrackPlayer.seekTo(currentProgress)

      dispatch(setShuffledSongList(shuffledList))

      setShuffle(true)
    }
  }

  const handleRepeat = () => {
    if (repeat) {
      TrackPlayer.setRepeatMode(RepeatMode.Off);

      setRepeat(false)
    }
    else {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);

      setRepeat(true)
    }
  }

  const loadData = async () => {
    const result = await getFavoriteSongs(user._id)

    if (result.songs.length !== 0) {
      const check = result.songs.some(item => item.encodeId === song.id)

      setIsLiked(check)
    }
  }

  useEffect(() => {
    if (playerState === 'playing') {
      animationRef.current?.play(25, 26)
    }
    else {
      animationRef.current?.play(60, 61)
    }
  }, [playerState])

  useEffect(() => {
    if (song.thumbnail) {
      loadData()
    }
  }, [])

  return (
    <ImageBackground
      style={styles.playerDetailsContainer}
      source={
        (!song.thumbnail && !song.cover)
          ? logo
          : {
            uri: song.thumbnail
              ? song.thumbnail
              : song.cover
          }
      }
      resizeMode='cover'
      blurRadius={15}
    >
      <View style={styles.detailsWrapper}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name='chevron-thin-down' style={styles.toolbarIcon} color={COLORS.white} />
          </TouchableOpacity>

          <Text style={styles.title}>
            {title}
          </Text>

          <TouchableOpacity
            onPress={() => setShowBottomSheet(!showBottomSheet)}
            disabled={song.thumbnail ? false : true}
          >
            <Feather
              name='more-vertical'
              style={styles.toolbarIcon}
              color={song.thumbnail
                ? COLORS.white
                : 'rgba(255, 255, 255, 0.2)'
              }
            />
          </TouchableOpacity>
        </View>

        {showBottomSheet &&
          <OptionsBottomSheet
            openBottomSheet={showBottomSheet}
            setOpenBottomSheet={setShowBottomSheet}
            song={{
              encodeId: song?.id,
              title: song?.title,
              thumbnailM: song?.thumbnail,
              url: song?.url,
              artistsNames: song?.artist
            }}
            loadData={loadData}
          />
        }

        <PlayerDetailsTabView
          navigation={navigation}
          onChangeTitle={onTitleChange}
          openPlaylist={openPlaylist}
          setOpenPlaylist={setOpenPlaylist}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />

        <View style={styles.playerControl}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={COLORS.white}
            maximumTrackTintColor={COLORS.icon}
            thumbTintColor={COLORS.white}
            value={progress.duration !== 0 ? progress.position : 0}
            onSlidingComplete={(value) => handleSeek(value)}
          />

          <View style={styles.durationWrapper}>
            {/* <Text style={styles.duration}></Text> */}
            <Text style={styles.duration}>{formatDuration(Math.round(progress.position))}</Text>
            <Text style={styles.duration}>{formatDuration(progress.duration)}</Text>
          </View>

          <View style={styles.controlWrapper}>
            <TouchableOpacity style={[styles.optionBtn, { backgroundColor: repeat ? 'rgba(169, 169, 169, 0.2)' : 'transparent' }]} onPress={handleRepeat}>
              <Feather name='repeat' style={styles.toolbarIcon} color={COLORS.white}/>
            </TouchableOpacity>

            <View style={styles.playPauseSkipController}>
              <TouchableOpacity onPress={handleSkipToPrevious}>
                <Ionicons name='play-skip-back' style={styles.controlIcon} />
              </TouchableOpacity>

              {playbackState.state === 'loading'
                ? <ActivityIndicator size="large" color={COLORS.white} style={styles.loadingAnimation} />
                : <TouchableOpacity onPress={handlePlayPauseMusic} style={styles.playPauseBtn}>
                  <LottieView
                    ref={animationRef}
                    style={styles.animationView}
                    source={playPauseAnimation}
                    duration={700}
                    loop={false}
                    onAnimationLoaded={() => {
                      if (playerState === 'playing') {
                        animationRef.current?.play(25, 26)
                      }
                      else {
                        animationRef.current?.play(60, 61)
                      }
                    }}
                  />
                </TouchableOpacity>
              }

              <TouchableOpacity onPress={handleSkipToNext}>
                <Ionicons name='play-skip-forward' style={styles.controlIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.optionBtn, { backgroundColor: shuffle ? 'rgba(169, 169, 169, 0.2)' : 'transparent' }]} onPress={handleShuffle} disabled={songList.length <= 1 ? true : false}>
              <Feather name='shuffle' style={styles.toolbarIcon} color={COLORS.white}/>
            </TouchableOpacity>
          </View>

          <View style={styles.othersWrapper}>
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => setShowAddToPlaylist(true)}
              disabled={song.thumbnail ? false : true}
            >
              <MaterialCommunityIcons
                name='music-note-plus'
                style={styles.playlistIcon}
                color={song.thumbnail
                  ? COLORS.white
                  : 'rgba(255, 255, 255, 0.2)'
                }
              />
            </TouchableOpacity>

            <View style={styles.qualityWrapper}>
              <Text style={styles.quality}>128 Kbps</Text>
            </View>

            <TouchableOpacity style={[styles.optionBtn, { backgroundColor: openPlaylist ? 'rgba(169, 169, 169, 0.2)' : 'transparent' }]} onPress={() => setOpenPlaylist(!openPlaylist)}>
              <MaterialCommunityIcons name='playlist-music' style={styles.playlistIcon} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <PlaylistListModal
        setShowModal={setShowAddToPlaylist}
        showModal={showAddToPlaylist}
        song={{
          encodeId: song?.id,
          title: song?.title,
          thumbnailM: song?.thumbnail,
          url: song?.url,
          artistsNames: song?.artist
        }}
      />
    </ImageBackground>
  )
}

export default memo(PlayerDetails)
