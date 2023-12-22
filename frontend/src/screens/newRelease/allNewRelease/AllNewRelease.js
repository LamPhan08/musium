import React, { useEffect, useState } from 'react'
import { FlatList, Dimensions, View } from 'react-native'
import ChunkArray from '../../../utils/chunkArray';
import NewReleaseCard from '../../../components/newReleaseCard/NewReleaseCard';
import styles from './newRelease.style'
import CheckSongHasMp3 from '../../../utils/checkSongHasMp3';
import LoadingDots from "react-native-loading-dots";
import { COLORS } from '../../../constants/colors';
import EditArrayForTrackPlayer from '../../../utils/editArrayForTrackPlayer';

const { width } = Dimensions.get('window')


const AllNewRelease = ({ route }) => {
  const { data } = route.params
  // console.log(data)
  const [allNewReleaseData, setAllNewReleaseData] = useState([])

  useEffect(() => {
    (
      async () => {
        setAllNewReleaseData(await CheckSongHasMp3(data, '', 12))
      }
    ) ()
  }, [])
  
  const chunkedArray = ChunkArray(allNewReleaseData, 3)

  if (allNewReleaseData.length !== 0) {
    return (
      <FlatList
        data={chunkedArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.newReleaseList}
        contentContainerStyle={{ gap: 10 }}
        snapToInterval={width * 0.8 + 10}
        decelerationRate='fast'
        // removeClippedSubviews={true}
        // initialNumToRender={2}
        // maxToRenderPerBatch={2}
        // windowSize={2}
        renderItem={({ item, index }) => {
          return <NewReleaseCard newReleaseData={item} key={index} newReleaseList={EditArrayForTrackPlayer(allNewReleaseData)} cardIndex={index}/>
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

export default AllNewRelease
