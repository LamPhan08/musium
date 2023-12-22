import React, { useState, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import styles from './allSearch.style'
import CheckSongHasMp3 from '../../../utils/checkSongHasMp3'
import EditArrayForTrackPlayer from '../../../utils/editArrayForTrackPlayer'
import SongCard from '../../../components/songCard/SongCard'
import PlaylistCard from '../../../components/playlistCard/PlaylistCard'
import ArtistCard from '../../../components/artistCard/ArtistCard'

const AllSearch = ({ navigation, allSearchData, switchTab }) => {
  const [songData, setSongData] = useState()

  const handleViewMore = (index) => {
    switchTab(index)
  }

  useEffect(() => {
    (
      async () => {
        if (allSearchData.songs) {
          const result = await CheckSongHasMp3(allSearchData.songs, '', 5)

          setSongData(result)
        }
      }
    )()
  }, [])

  return (
    <ScrollView
      style={styles.allSearchContainer}
      showsVerticalScrollIndicator={false}
      decelerationRate='fast'
      contentContainerStyle={{ gap: 5 }}
    >
      {songData
        ?
        <View style={styles.searchItem}>
          <Text style={styles.heading}>Bài hát</Text>

          <View style={styles.cardList}>
            {songData.map((song, index) => {
              return (
                <SongCard key={index} index={0} song={song} playlistSongs={EditArrayForTrackPlayer([song])} />
              )
            })}
          </View>

          <TouchableOpacity style={styles.viewMoreBtn} onPress={() => handleViewMore(1)}>
            <Text style={styles.btnText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        : null
      }

      {
        allSearchData.playlists
          ?
          <View style={styles.searchItem}>
            <Text style={styles.heading}>Playlist</Text>

            <View style={styles.cardList}>
              {allSearchData.playlists.slice(0, 5).map((playlist, index) => {
                return (
                  <PlaylistCard navigation={navigation} playlist={playlist} key={index} />
                )
              })}
            </View>

            <TouchableOpacity style={styles.viewMoreBtn} onPress={() => handleViewMore(2)}>
              <Text style={styles.btnText}>Xem thêm</Text>
            </TouchableOpacity>
          </View>

          : null
      }

      {
        allSearchData.artists
          ?
          <View style={styles.searchItem}>
            <Text style={styles.heading}>Nghệ sĩ</Text>

            <View style={styles.cardList}>
              {allSearchData.artists.slice(0, 5).map((artist, index) => {
                return (
                  <ArtistCard key={index} artist={artist}/>
                )
              })}
            </View>

            <TouchableOpacity style={styles.viewMoreBtn} onPress={() => handleViewMore(3)}>
              <Text style={styles.btnText}>Xem thêm</Text>
            </TouchableOpacity>
          </View>

          : null
      }
    </ScrollView>
  )
}

export default AllSearch
