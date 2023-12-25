import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './artistCard.style'
import Entypo from 'react-native-vector-icons/Entypo'

const ArtistCard = ({navigation, artist}) => {
  
  const handleViewArtist = () => {
    navigation.navigate('ArtistInformation', {
      artistAlias: artist.alias,
      artistName: artist.name
    })
  }

  return (
    <TouchableOpacity style={styles.artistCard} onPress={handleViewArtist}>
      <Image source={{uri: artist.thumbnail}} style={styles.artistThumbnail}/>

        <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>

      <Entypo name='chevron-right' style={styles.icon}/>
    </TouchableOpacity>
  )
}

export default ArtistCard
