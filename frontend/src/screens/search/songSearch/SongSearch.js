import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import { COLORS } from '../../../constants/colors'
import CheckSongHasMp3 from '../../../utils/checkSongHasMp3'
import styles from './songSearch.style'
import SongCard from '../../../components/songCard/SongCard'
import EditArrayForTrackPlayer from '../../../utils/editArrayForTrackPlayer'

const SongSearch = ({ songList }) => {
  const [songs, setSongs] = useState()

  useEffect(() => {
    (
      async () => {
        if (songList) {
          const mp3Songs = await CheckSongHasMp3(songList)

          setSongs(mp3Songs)
        }
      }
    )()
  }, [])

  if (songList) {
    if (songs) {
      return (
        <FlatList
          data={songs}
          style={styles.songList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={20}
          renderItem={({item, index}) => {
            return (
              <SongCard key={index} song={item} index={0} playlistSongs={EditArrayForTrackPlayer([item])}/>
            )
          }}
        />
      )
    }
    else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      )
    }
  }
  else {
    return (
      <View style={styles.noSongsContainer}>
        <Text style={styles.noSongs}>Không tìm thấy Bài hát nào</Text>
      </View>
    )
  }
}

export default SongSearch
