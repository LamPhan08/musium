import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import styles from './artistSlider.style'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ArtistSlider = ({ navigation, artistsData }) => {
  const handleOpenArtist = (artist) => {
    navigation.push('ArtistInformation', {
      artistAlias: artist.alias,
      artistName: artist.name
    })
  }

  return (
    <View style={styles.artistSlider}>
      <TouchableOpacity style={styles.titleWrapper}>
        <Text style={styles.title}>{artistsData.title}</Text>

        <Ionicons name='chevron-forward' style={styles.icon} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        decelerationRate='fast'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
      >
        {artistsData.items.map((artist, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => handleOpenArtist(artist)} style={[styles.artistCard, {marginRight: index === artistsData.items.length - 1 ? 15 : 0}]}>
              <Image source={{ uri: artist.thumbnailM }} style={styles.artistThumbnail} />

              <Text style={styles.artistName}>{artist.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ArtistSlider
