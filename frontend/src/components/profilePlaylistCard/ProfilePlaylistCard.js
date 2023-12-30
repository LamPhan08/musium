import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import styles from './profilePlaylistCard.style'
import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors'

const ProfilePlaylistCard = ({navigation, playlist, userId}) => {
  return (
    <TouchableOpacity style={styles.playlistCard} onPress={() => navigation.navigate('UserPlaylistDetails', {playlist: playlist, userId: userId})}>
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
