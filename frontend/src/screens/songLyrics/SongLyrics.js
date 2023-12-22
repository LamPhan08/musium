import React, { useState, useEffect, useRef, memo } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import { getSongLyric } from '../../api/getData'
import styles from './songLyrics.style'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState } from '../../redux/songSlice'
import TrackPlayer, { useProgress } from 'react-native-track-player'

const SongLyrics = () => {
  const { song } = useSelector(state => state.song)
  const dispatch = useDispatch()
  const [songLyrics, setSongLyrics] = useState()

  const lyricsFlatlistRef = useRef()

  const progress = useProgress()

  useEffect(() => {
    (
      async () => {
        const data = await getSongLyric(song.id)

        setSongLyrics(data.sentences)
      }
    )()
  }, [song])

  const handleSeek = (timestamp) => {
    TrackPlayer.seekTo(timestamp)

    dispatch(setPlayerState('playing'))
    TrackPlayer.play()
  }

  const scrollToIndex = (index) => {
    lyricsFlatlistRef.current?.scrollToIndex({ animated: true, index: index });
  };

  const getItemLayout = (data, index) => ({
    length: 38,
    offset: 38 * index,
    index
  })

  if (songLyrics) {
    return (
      <View style={styles.songLyricsContainer}>
        <View style={styles.songWrapper}>
          <Image source={{ uri: song.thumbnail }} style={styles.songThumbnail} />

          <View style={styles.titleAndArtistsWrapper}>
            <Text style={styles.songTitle}>{song.title}</Text>

            <Text style={styles.songArtists}>{song.artist}</Text>
          </View>
        </View>

        {/* <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false} decelerationRate='fast' ref={lyricsScrollViewRef}>
          <View style={styles.lyricsWrapper}>
            
          </View>
        </ScrollView> */}

        <FlatList
          style={{ marginTop: 15 }}
          showsVerticalScrollIndicator={false}
          decelerationRate='fast'
          ref={(ref) => {
            lyricsFlatlistRef.current = ref
          }}
          initialNumToRender={10}
          data={songLyrics}
          getItemLayout={getItemLayout}
          renderItem={({ item, index }) => {
            if (item.words[0].startTime / 1000 - 1.4 <= (progress.position)
              && (progress.position) <= item.words[item.words.length - 1].endTime / 1000 - 1.4) {
              scrollToIndex(index)
            }

            return (
              <TouchableOpacity key={index} onPress={() => handleSeek(item.words[0].startTime / 1000)} style={[styles.lyricBtn]}>
                <Text style={[[
                  styles.lyric,
                  {
                    backgroundColor: item.words[0].startTime / 1000 - 1.4 < (progress.position)
                      && (progress.position) < item.words[item.words.length - 1].endTime / 1000 - 1.4
                      ? 'rgba(169, 169, 169, 0.3)'
                      : 'transparent'
                  }]]}>

                  {item.words.map(word => word.data).join(' ')}
                </Text>
              </TouchableOpacity>
            )
          }}
        />

      </View>
    )
  }
  else {
    return (
      <View style={styles.noLyricsContainer}>
        <Text style={styles.noLyrics}>Chưa có lời cho bài hát này</Text>
      </View>
    )
  }
}

export default memo(SongLyrics)
