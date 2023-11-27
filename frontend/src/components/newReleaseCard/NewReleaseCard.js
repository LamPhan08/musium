import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './newReleaseCard.style'
import HandleDate from '../../../utils/handleDate'
import Feather from 'react-native-vector-icons/Feather'

const NewReleaseCard = ({ newReleaseData }) => {
  return (
    <View style={styles.newReleaseItemContainer}>
      {newReleaseData.map((item, index) => {
        return (
          <TouchableOpacity style={styles.newReleaseItem} key={index}>
            <Image source={{ uri: item.thumbnailM }} style={styles.thumbnail} />

            <View style={styles.newReleaseDetails}>
              <View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>

                <Text style={styles.artistsNames} numberOfLines={1}>{item.artistsNames}</Text>
              </View>

              <Text style={styles.releaseDate} numberOfLines={1}>{HandleDate(item.releaseDate)}</Text>
            </View>

            <TouchableOpacity>
              <Feather name='more-vertical' style={styles.moreIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default NewReleaseCard
