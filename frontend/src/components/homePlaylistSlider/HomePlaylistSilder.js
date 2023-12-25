import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import styles from './homePlaylistSlider.style'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PlaylistSlider = ({ navigation, playlistData }) => {
  const handleOpenPlaylist = (playlistItem) => {
    navigation.navigate('PlaylistDetails', {
      playlistId: playlistItem.encodeId,
      playlistThumbnail: playlistItem.thumbnailM
    })
  }

  return (
    <SafeAreaView style={styles.playlistsContainer}>
      {playlistData.map((item, index) => {
        return (
          <View key={index} style={styles.playlistWrapper}>
            <TouchableOpacity style={styles.titleWrapper}>
              <Text style={styles.title}>{item.title}</Text>

              <Ionicons name='chevron-forward' style={styles.icon}/>
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 20}}>
              {item.items.map((playlistItem, index) => {
                return (
                  <TouchableOpacity style={styles.playlistPreviewWrapper} key={index} onPress={() => handleOpenPlaylist(playlistItem)}>
                    <Image source={{ uri: playlistItem.thumbnailM }} style={styles.thumbnail} />

                    <Text style={(item.sectionId === 'h100' || item.sectionId === 'hAlbum') ? styles.playlistTitle : styles.playlistShortDescription} numberOfLines={2}>
                      {(item.sectionId === 'h100' || item.sectionId === 'hAlbum')
                        ? playlistItem.title
                        : playlistItem.sortDescription}
                    </Text>

                    {item.sectionId === 'hAlbum'
                      ? <Text style={styles.artistsNames} numberOfLines={1}>{playlistItem.artistsNames}</Text>
                      : null
                    }
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        )
      })}
    </SafeAreaView>
  )
}

export default PlaylistSlider
