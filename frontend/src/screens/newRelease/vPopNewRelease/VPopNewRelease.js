import React, {useState, useEffect} from 'react'
import { FlatList, Dimensions, View } from 'react-native'
import ChunkArray from '../../../../utils/chunkArray'
import NewReleaseCard from '../../../components/newReleaseCard/NewReleaseCard';
import styles from '../allNewRelease/newRelease.style'
import CheckSongHasMp3 from '../../../../utils/checkSongHasMp3';
import LoadingDots from "react-native-loading-dots";
import { COLORS } from '../../../constants/colors';
import EditArrayForTrackPlayer from '../../../../utils/editArrayForTrackPlayer';

const { width } = Dimensions.get('window')

const VPopNewRelease = ({ route }) => {
  const { data } = route.params

  const [vPopNewReleaseData, setVPopNewReleaseData] = useState([])

  useEffect(() => {
    (
      async () => {
        setVPopNewReleaseData(await CheckSongHasMp3(data))
      }
    ) ()
  }, [])


  const chunkedArray = ChunkArray(vPopNewReleaseData, 3)


  if (vPopNewReleaseData.length !== 0) {
    return (
      <FlatList
        data={chunkedArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newReleaseList}
        contentContainerStyle={{ gap: 10 }}
        snapToInterval={width * 0.8 + 10}
        decelerationRate='fast'
        removeClippedSubviews={true}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={2}
        renderItem={({ item, index }) => {
          return <NewReleaseCard newReleaseData={item} key={index} newReleaseList={EditArrayForTrackPlayer(vPopNewReleaseData)} cardIndex={index}/>
        }}
      />
    )
      }
  else {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.dotsWrapper}>
        <LoadingDots
          size={8}
          colors={[COLORS.primary, COLORS.primary, COLORS.primary, COLORS.primary]}
          />
        </View>
      </View>
    )
  }
}

export default VPopNewRelease
