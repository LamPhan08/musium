import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal, Image, ToastAndroid } from 'react-native'
import styles from './userPlaylistSongBottomSheet.style'
import { COLORS } from '../../constants/colors'
import { addSongToFavorites, getFavoriteSongs, removeSongFromFavorites } from '../../api/favoriteSongs'
import { useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { removeSongFromPlaylist } from '../../api/playlist'

const UserPlaylistSongBottomSheet = ({ song, openBottomSheet, setOpenBottomSheet, loadData, playlistId }) => {
  const [isLoved, setIsLoved] = useState(false)

  const { user } = useSelector(state => state.song)
  // console.log(song)

  const handleAdd = async () => {
    await addSongToFavorites(user._id, song);

    ToastAndroid.show(`Đã thêm ${song.title} vào danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    setOpenBottomSheet(!openBottomSheet)

    if (loadData) {
      loadData()
    }
  }

  const handleRemove = async () => {
    await removeSongFromFavorites(user._id, song.encodeId)

    ToastAndroid.show(`Đã gỡ ${song.title} khỏi danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    setOpenBottomSheet(!openBottomSheet)


    if (loadData) {
      loadData()
    }
  }

  const handleRemoveSongFromPlaylist = async () => {
    await removeSongFromPlaylist(user._id, song.encodeId, playlistId)

    ToastAndroid.show(`Đã xóa ${song.title} khỏi Playlist!`, ToastAndroid.BOTTOM)

    setOpenBottomSheet(!openBottomSheet)

    if (loadData) {
      loadData()
    }
  }

  useEffect(() => {
    (
      async () => {
        const result = await getFavoriteSongs(user._id)

        if (result.songs.length !== 0) {
          const check = result.songs.some(item => item.encodeId === song.encodeId)

          setIsLoved(check)
        }

      }
    )()
  }, [])

  return (
    <Modal
      transparent={true}
      visible={openBottomSheet}
      animationType='slide'
      onRequestClose={() => setOpenBottomSheet(!openBottomSheet)}>
      <Pressable
        style={styles.backdrop}
        onPress={() => setOpenBottomSheet(!openBottomSheet)}
      />
      <View
        style={styles.bottomSheet}
      >
        <View style={styles.songIn4Wrapper}>
          <Image source={{ uri: song.thumbnailM }} style={styles.songThumbnail} />

          <View style={styles.songTitleArtistWrapper}>
            <Text style={styles.songTitle}>{song.title}</Text>

            <Text style={styles.songArtistsNames}>{song.artistsNames}</Text>
          </View>
        </View>

        <View style={styles.optionsWrapper}>
          <TouchableOpacity style={styles.optionBtn} onPress={isLoved ? handleRemove : handleAdd}>
            {isLoved ?
              <Ionicons name='heart' style={styles.icon} color={COLORS.primary} /> :

              <Ionicons name='heart-outline' style={styles.icon} color={COLORS.white} />
            }

            <Text style={styles.optionText}>{isLoved ? 'Gỡ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn} onPress={handleRemoveSongFromPlaylist}>
            <Feather name='trash-2' style={styles.icon} color={COLORS.white}/>

            <Text style={styles.optionText}>Xóa khỏi Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default UserPlaylistSongBottomSheet
