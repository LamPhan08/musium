import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import styles from './profilePlaylistCard.style'
import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors'

const ProfilePlaylistCard = ({navigation, playlist}) => {
  return (
    <TouchableOpacity style={styles.playlistCard}>
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

        <Text style={styles.creator}>{playlist.creator}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProfilePlaylistCard
