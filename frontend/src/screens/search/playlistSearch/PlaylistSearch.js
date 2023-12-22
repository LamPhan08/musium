import React from 'react'
import { View, FlatList, Text } from 'react-native'
import styles from './playlistSearch.style'
import PlaylistCard from '../../../components/playlistCard/PlaylistCard'

const PlaylistSearch = ({ navigation, playlistList }) => {
  if (playlistList) {
    return (
      <FlatList
        data={playlistList}
        style={styles.playlistList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={20}
        renderItem={({item, index}) => {
          return (
            <PlaylistCard navigation={navigation} key={index} playlist={item}/>
          )
        }}
      />
    )
  }
  else {
    return (
      <View style={styles.noPlaylistsContainer}>
        <Text style={styles.noPlaylists}>Không tìm thấy Playlist nào</Text>
      </View>
    )
  }
}

export default PlaylistSearch
