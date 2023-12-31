import React, { useState, useRef, memo, useEffect, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './songThumbnail.style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import circleSoundAnimation from '../../../assets/images/CircleSound.json'
import LottieView from 'lottie-react-native'
import { COLORS } from '../../constants/colors'
import { usePlaybackState } from 'react-native-track-player'
import { addSongToFavorites, removeSongFromFavorites } from '../../api/favoriteSongs'
import logo from '../../../assets/images/logo.png'

const SongThumbnail = ({ isLiked, setIsLiked }) => {
  const { song, playerState, user } = useSelector(state => state.song)
  const playbackState = usePlaybackState()
  const circleSoundRef = useRef()
  // console.log('song:', song)

  const handleLike = async () => {
    if (isLiked) {
      await removeSongFromFavorites(user._id, song.id)

      setIsLiked(false)

      ToastAndroid.show(`Đã gỡ ${song.title} khỏi danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)
    }
    else {
      await addSongToFavorites(user._id, {
        encodeId: song.id,
        title: song?.title,
        thumbnailM: song?.thumbnail,
        url: song?.url,
        artistsNames: song?.artist
      });

      setIsLiked(true)

      ToastAndroid.show(`Đã thêm ${song.title} vào danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)
    }
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

        <Image
         source={
          (!song.thumbnail && !song.cover)
            ? logo
            : {
              uri: song.thumbnail
                ? song.thumbnail
                : song.cover
            }
        }
         style={styles.thumbnail} />
      </View>



      <View style={styles.songDetailsWrapper}>
        <View style={styles.songTitleAndArtists}>
          <Text style={styles.title} numberOfLines={1}>{song.title}</Text>

          <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
        </View>

        <TouchableOpacity onPress={handleLike} disabled={song.thumbnail ? false : true}>
          {isLiked
            ? <Ionicons name='heart' style={styles.icon} color={COLORS.primary} />
            : <Ionicons 
            name='heart-outline' 
            style={styles.icon} 
            color={song.thumbnail
              ? COLORS.white
              : 'rgba(255, 255, 255, 0.2)'
            } 
             />
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateComment} disabled={song.thumbnail ? false : true}>
          <Ionicons 
          name='chatbubble-ellipses-outline' 
          style={styles.icon} 
          color={song.thumbnail
            ? COLORS.white
            : 'rgba(255, 255, 255, 0.2)'
          } 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(SongThumbnail)
