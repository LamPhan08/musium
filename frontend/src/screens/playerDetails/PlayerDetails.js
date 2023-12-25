import React, { useState, useRef, memo, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import PlayerDetailsTabView from '../../navigators/PlayerDetailsTabView'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState } from '../../redux/songSlice'
import styles from './playerDetails.style'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress, usePlaybackState } from 'react-native-track-player'
import formatDuration from '../../utils/formatDuration'
import { COLORS } from '../../constants/colors'
import LottieView from 'lottie-react-native'
import playPauseAnimation from '../../../assets/images/PlayPauseAnimation.json'

const PlayerDetails = ({ navigation }) => {
  const [title, setTitle] = useState('Đang phát')
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [openPlaylist, setOpenPlaylist] = useState(false)
  const { song, songList, playerState } = useSelector(state => state.song)
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
  }

  const handleShuffle = () => {
    setShuffle(!shuffle)
  }

  const handleRepeat = () => {
    setRepeat(!repeat)
  }

  useEffect(() => {
    if (playerState === 'playing') {
      animationRef.current?.play(25, 26)
    }
    else {
      animationRef.current?.play(60, 61)
    }
  }, [playerState])


  return (
    <ImageBackground style={styles.playerDetailsContainer} source={{ uri: song.thumbnail }} resizeMode='cover' blurRadius={15}>
      <View style={styles.detailsWrapper}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name='chevron-thin-down' style={styles.toolbarIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>
            {title}
          </Text>

          <TouchableOpacity>
            <Feather name='more-vertical' style={styles.toolbarIcon} />
          </TouchableOpacity>
        </View>

        <PlayerDetailsTabView navigation={navigation} onChangeTitle={onTitleChange} openPlaylist={openPlaylist} setOpenPlaylist={setOpenPlaylist}/>

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
            <TouchableOpacity style={[styles.optionBtn ,{backgroundColor: repeat ? 'rgba(169, 169, 169, 0.2)' : 'transparent'}]} onPress={handleRepeat}>
              <Feather name='repeat' style={styles.toolbarIcon} />
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

            <TouchableOpacity style={[styles.optionBtn ,{backgroundColor: shuffle ? 'rgba(169, 169, 169, 0.2)' : 'transparent'}]} onPress={handleShuffle}>
              <Feather name='shuffle' style={styles.toolbarIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.othersWrapper}>
            <TouchableOpacity style={styles.optionBtn}>
              <MaterialCommunityIcons name='music-note-plus' style={styles.playlistIcon} />
            </TouchableOpacity>

            <View style={styles.qualityWrapper}>
              <Text style={styles.quality}>128 Kbps</Text>
            </View>

            <TouchableOpacity style={[styles.optionBtn, {backgroundColor: openPlaylist ? 'rgba(169, 169, 169, 0.2)' : 'transparent'}]} onPress={() => setOpenPlaylist(!openPlaylist)}>
              <MaterialCommunityIcons name='playlist-music' style={styles.playlistIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default memo(PlayerDetails)
