import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './playlistCard.style'
import Entypo from 'react-native-vector-icons/Entypo'

const PlaylistCard = ({navigation, playlist}) => {
  const handleOpenPlaylist = () => {
    navigation.navigate('PlaylistDetails', {
      playlistId: playlist.encodeId,
      playlistThumbnail: playlist.thumbnailM
    })
  }

  return (
    <TouchableOpacity style={styles.playlistCard} onPress={() => handleOpenPlaylist()}>
      <Image source={{uri: playlist.thumbnailM}} style={styles.playlistThumbnail}/>

      <View style={styles.playlistIn4Wrapper}>
        <Text style={styles.playlistTitle} numberOfLines={1}>{playlist.title}</Text>

        <Text style={styles.playlistArtistsNames} numberOfLines={1}>{playlist.artistsNames}</Text>
      </View>

      <Entypo name='chevron-right' style={styles.icon}/>
    </TouchableOpacity>
  )
}

export default PlaylistCard
