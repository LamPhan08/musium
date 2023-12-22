import React from 'react'
import {View, FlatList, Text} from 'react-native'
import styles from './artistSearch.style'
import ArtistCard from '../../../components/artistCard/ArtistCard'

const ArtistSearch = ({navigation, artistList}) => {
  if (artistList) {
    return (
      <FlatList
        data={artistList}
        style={styles.artistList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={20}
        renderItem={({item, index}) => {
          return (
            <ArtistCard key={index} artist={item} navigation={navigation}/>
          )
        }}
      />
    )
  }
  else {
    return (
      <View style={styles.noArtistsContainer}>
        <Text style={styles.noArtists}>Không tìm thấy Playlist nào</Text>
      </View>
    )
  }
}

export default ArtistSearch
