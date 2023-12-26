import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal, Image, ToastAndroid } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './optionsBottomSheet.style'
import { COLORS } from '../../constants/colors'
import { getWriteExternalStoragePermission } from '../../utils/getPermission'
import RNFetchBlob from 'rn-fetch-blob'
import { err } from 'react-native-svg'

const OptionsBottomSheet = ({ song, openBottomSheet, setOpenBottomSheet }) => {
  const [isLoved, setIsLoved] = useState(true)

  const handleAdd = () => {
    setIsLoved(!isLoved)

    ToastAndroid.show(`Đã thêm ${song.title} vào danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    setOpenBottomSheet(!openBottomSheet)
  }

  const handleRemove = () => {
    setIsLoved(!isLoved)

    ToastAndroid.show(`Đã gỡ ${song.title} khỏi danh sách yêu thích của bạn!`, ToastAndroid.BOTTOM)

    setOpenBottomSheet(!openBottomSheet)
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

  return (
    <Modal transparent={true} visible={openBottomSheet} animationType='slide'>
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

            <Text style={styles.optionText}>Tải về</Text>
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

            <Text style={styles.optionText}>Thêm vào playlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default OptionsBottomSheet
