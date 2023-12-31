import React from 'react'
import styles from './addSongPlaylistCard.style'
import { TouchableOpacity, View, Text, Image, ToastAndroid } from 'react-native'
import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors'
import { addSongToPlaylist } from '../../api/playlist'

const AddSongPlaylistCard = ({playlist, userId, song, setShowBottomSheet}) => {
  const handleAddSongToPlaylist = async () => {
    await addSongToPlaylist(userId, song, playlist._id)

    ToastAndroid.show(`Đã thêm vào Playlist ${playlist.title}`, ToastAndroid.BOTTOM)

    setShowBottomSheet(false)
  }

  return (
    <TouchableOpacity style={styles.playlistCard} onPress={handleAddSongToPlaylist}>
      <Image
        source={playlist.songs.length !== 0
          ? {uri: playlist.songs[0].thumbnailM}
          : logo
        }
        style={[styles.playlistThumbnail, {
          backgroundColor: playlist.songs.length === 0
            ? COLORS.lightBlack
            : 'transparent'
        }]}
      />

      <View style={styles.playlistIn4Wrapper}>
        <Text style={styles.title}>{playlist.title}</Text>

        <Text style={styles.songTotal}>{playlist.songs.length} bài hát</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AddSongPlaylistCard
