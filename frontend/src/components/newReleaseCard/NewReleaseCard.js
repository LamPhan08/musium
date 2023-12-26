import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './newReleaseCard.style'
import HandleDate from '../../utils/handleDate'
import Feather from 'react-native-vector-icons/Feather'
import TrackPlayer from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { setSong, setSongList, setPlayerState } from '../../redux/songSlice'
import OptionsBottomSheet from '../optionsBottomSheet/OptionsBottomSheet'

const NewReleaseCard = ({ newReleaseData, newReleaseList, cardIndex }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [bottomSheetSong, setBottomSheetSong] = useState()
  const dispatch = useDispatch()
  // console.log('newReleaseList:', newReleaseList)

  const handlePlayMusic = async (index) => {
    await TrackPlayer.setQueue(newReleaseList)

    dispatch(setSong(newReleaseList[cardIndex * 3 + index]))
    dispatch(setSongList(newReleaseList))
    dispatch(setPlayerState('playing'))

    await TrackPlayer.skip(cardIndex * 3 + index)

    TrackPlayer.play()
    

    // console.log(newReleaseData)
  }

  const handleShowBottomSheet = (song) => {
    setBottomSheetSong(song)

    setShowBottomSheet(!showBottomSheet)
  }

  return (
    <View style={styles.newReleaseItemContainer}>
      {newReleaseData.map((item, index) => {
        return (
          <TouchableOpacity style={styles.newReleaseItem} key={index} onPress={() => handlePlayMusic(index)}>
            <Image source={{ uri: item.thumbnailM }} style={styles.thumbnail} />

            <View style={styles.newReleaseDetails}>
              <View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>

                <Text style={styles.artistsNames} numberOfLines={1}>{item.artistsNames}</Text>
              </View>

              <Text style={styles.releaseDate} numberOfLines={1}>{HandleDate(item.releaseDate)}</Text>
            </View>

            <TouchableOpacity onPress={() => handleShowBottomSheet(item)}>
              <Feather name='more-vertical' style={styles.moreIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        )
      })}

      {showBottomSheet &&
        <OptionsBottomSheet song={bottomSheetSong} openBottomSheet={showBottomSheet} setOpenBottomSheet={setShowBottomSheet}/>
      }
    </View>
  )
}

export default NewReleaseCard
