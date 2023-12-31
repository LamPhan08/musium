import React, {useState} from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import styles from './songCard.style'
import Feather from 'react-native-vector-icons/Feather'
import TrackPlayer from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import { setSong, setSongList, setPlayerState } from '../../redux/songSlice'
import OptionsBottomSheet from '../optionsBottomSheet/OptionsBottomSheet'

const SongCard = ({ song, index, playlistSongs, loadData, notShowMenuBtn }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const dispatch = useDispatch()

  const handlePlayMusic = async () => {
    // console.log(playlistSongs)
    await TrackPlayer.setQueue(playlistSongs)

    dispatch(setSong(playlistSongs[index]))
    dispatch(setSongList(playlistSongs))
    dispatch(setPlayerState('playing'))

    await TrackPlayer.skip(index)

    TrackPlayer.play()
  }

  return (
    <TouchableOpacity style={styles.songContainer} onPress={() => handlePlayMusic()}>
      <Image source={{ uri: song.thumbnailM }} style={styles.songThumbnail} />

      <View style={styles.songDetails}>
          <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>

          <Text style={styles.songArtistsNames} numberOfLines={1}>{song.artistsNames}</Text>
      </View>

      {!notShowMenuBtn &&
        <TouchableOpacity onPress={() => setShowBottomSheet(!showBottomSheet)}>
        <Feather name='more-vertical' style={styles.moreIcon} />
      </TouchableOpacity>
      }

      {showBottomSheet &&
        <OptionsBottomSheet song={song} openBottomSheet={showBottomSheet} setOpenBottomSheet={setShowBottomSheet} loadData={loadData ? loadData : undefined}/>
      }
    </TouchableOpacity>
  )
}

export default SongCard
