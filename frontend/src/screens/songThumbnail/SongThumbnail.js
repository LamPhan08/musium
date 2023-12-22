import React, { useState, useRef, memo, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './songThumbnail.style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import circleSoundAnimation from '../../../assets/images/CircleSound.json'
import LottieView from 'lottie-react-native'
import { COLORS } from '../../constants/colors'
import { usePlaybackState } from 'react-native-track-player'


const SongThumbnail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const { song, playerState } = useSelector(state => state.song)
  const playbackState = usePlaybackState()
  const circleSoundRef = useRef()

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleNavigateComment = () => {

  }

  // console.log(playbackState.state)

  useEffect(() => {
    if (playbackState.state === 'playing') {
      circleSoundRef.current?.play()

    }
    else {
      circleSoundRef.current?.reset()
    }
  }, [playbackState.state])


  return (
    <View style={styles.songThumbnailContainer}>
      <View style={styles.thumbnailWrapper}>
      <LottieView
        ref={circleSoundRef}
        style={styles.circleSoundAnimation}
        source={circleSoundAnimation}
        duration={8000}
        loop={true}
        autoPlay={false}
        onAnimationLoop={() => {
          if (playerState === 'playing') {
            circleSoundRef.current.play()
          }
          else {
            circleSoundRef.current.reset()
          }
        }}
        // onAnimationLoaded={() => {
          
        // }}
      />

        <Image source={{uri: song.thumbnail}} style={styles.thumbnail}/>
      </View>

      

      <View style={styles.songDetailsWrapper}>
        <View style={styles.songTitleAndArtists}>
          <Text style={styles.title} numberOfLines={1}>{song.title}</Text>

          <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
        </View>

        <TouchableOpacity onPress={handleLike}>
          {isLiked
            ? <Ionicons name='heart' style={styles.icon} color={COLORS.primary} />
            : <Ionicons name='heart-outline' style={styles.icon} color={COLORS.white} />
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateComment}>
          <Ionicons name='chatbubble-ellipses-outline' style={styles.icon} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(SongThumbnail)
