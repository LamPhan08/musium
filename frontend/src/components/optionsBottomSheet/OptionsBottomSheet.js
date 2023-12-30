import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal, Image, ToastAndroid } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './optionsBottomSheet.style'
import { COLORS } from '../../constants/colors'
import RNFetchBlob from 'rn-fetch-blob'
import { addSongToFavorites, getFavoriteSongs, removeSongFromFavorites } from '../../api/favoriteSongs'
import { useSelector } from 'react-redux'

const OptionsBottomSheet = ({ song, openBottomSheet, setOpenBottomSheet, loadData }) => {
  const [isLoved, setIsLoved] = useState(false)

  const {user} = useSelector(state => state.song)
  // console.log(song)

  const handleAdd = async () => {
    setOpenBottomSheet(!openBottomSheet)
    
    await addSongToFavorites(user._id, song);

    ToastAndroid.show(`Đã thêm ${song.title} vào danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    if (loadData) {
      loadData()
    }
  }

  const handleRemove = async () => {
    // setIsLoved(!isLoved)
    setOpenBottomSheet(!openBottomSheet)
    
    await removeSongFromFavorites(user._id, song.encodeId)
    
    ToastAndroid.show(`Đã gỡ ${song.title} khỏi danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    if (loadData) {
      loadData()
    }
  }

  const handleDownload = async () => {
    ToastAndroid.show(`Đã thêm ${song.title} vào danh sách tải xuống!`, ToastAndroid.BOTTOM)

    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: song.title,
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${song.title}` + '.mp3',
        description: 'Downloading'
      }
    }).fetch('GET', song.url)
      .then()
      .catch(err => console.log(err))

    setOpenBottomSheet(!openBottomSheet)
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
    ) ()
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
          <TouchableOpacity style={styles.optionBtn} onPress={handleDownload}>
            <MaterialCommunityIcons name='progress-download' style={styles.icon} color={COLORS.white} />

            <Text style={styles.optionText}>Tải bài hát</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn} onPress={isLoved ? handleRemove : handleAdd}>
            {isLoved ?
              <Ionicons name='heart' style={styles.icon} color={COLORS.primary} /> :

              <Ionicons name='heart-outline' style={styles.icon} color={COLORS.white} />
            }

            <Text style={styles.optionText}>{isLoved ? 'Gỡ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <MaterialCommunityIcons name='music-note-plus' style={styles.icon} color={COLORS.white} />

            <Text style={styles.optionText}>Thêm vào Playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default OptionsBottomSheet
