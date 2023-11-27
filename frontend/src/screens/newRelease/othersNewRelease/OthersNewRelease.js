import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import ChunkArray from '../../../../utils/chunkArray'
import NewReleaseCard from '../../../components/newReleaseCard/NewReleaseCard';
import styles from '../allNewRelease/newRelease.style'

const {width} = Dimensions.get('window')

const OthersNewRelease = ({ route }) => {
  const { data } = route.params

  const chunkedArray = ChunkArray(data, 3)

  // console.log(chunkedArray);

  return (
    <FlatList
      data={chunkedArray}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.newReleaseList}
      contentContainerStyle={{ gap: 10 }}
      snapToInterval={width * 0.8 + 10}
      decelerationRate='fast'
      renderItem={({ item, index }) => {
        return <NewReleaseCard newReleaseData={item} key={index} />
      }}
    />
  )
}

export default OthersNewRelease
