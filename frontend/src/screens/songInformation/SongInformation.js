import React, { useState, useEffect, memo } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './songInformation.style'
import { useSelector } from 'react-redux'
import { getSongIn4 } from '../../api/getData'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/colors'
import ConvertTimestamp from '../../utils/convertTimestamp'

const SongInformation = () => {
  const { song } = useSelector(state => state.song)
  const [songIn4, setSongIn4] = useState()

  useEffect(() => {
    (
      async () => {
        const data = await getSongIn4(song.id)

        setSongIn4(data)
      }
    )()
  }, [song])

  // console.log(songIn4)


  if (songIn4) {
    return (
      <ScrollView style={styles.songIn4Container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Thông tin bài hát</Text>

        <View style={styles.songIn4Wrapper}>
          <View style={styles.songTitleWrapper}>
            <Image style={styles.songThumbnail} source={{ uri: songIn4.thumbnailM }} />

            <View style={styles.titleAndArtistsWrapper}>
              <Text style={styles.songTitle} numberOfLines={1}>{songIn4.title}</Text>

              <Text style={styles.songArtists} numberOfLines={1}>{songIn4.artistsNames}</Text>

              <View style={styles.likeAndListenWrapper}>
                <View style={styles.itemWrapper}>
                  <Ionicons name='heart-outline' style={styles.icon} />

                  <Text style={styles.likeAndListen}>{songIn4.like}</Text>
                </View>

                <View style={styles.itemWrapper}>
                  <Feather name='headphones' style={styles.icon} />

                  <Text style={styles.likeAndListen}>{songIn4.listen}</Text>
                </View>
              </View>
            </View>
          </View>

          <View 
          style={[
            styles.songDetailsWrapper, 
            {
              marginTop: (!songIn4.composers && !songIn4.genres && songIn4.releaseDate === 0 && !songIn4.distributor) ? 0 : 20 
            }]}
          >
            {songIn4.composers !== undefined
              ? <View style={styles.detailsItem}>
                <Text style={styles.detailsProperty}>Người sáng tác</Text>

                <Text style={styles.detailsValue}>{songIn4.composers.map((item) => item.name).join(', ')}</Text>
              </View>
              : null
            }

            {songIn4.genres
              && <View style={styles.detailsItem}>
                <Text style={styles.detailsProperty}>Thể loại</Text>

                <Text style={styles.detailsValue}>{songIn4.genres.map((item) => item.name).join(', ')}</Text>
              </View>
            }

             {
              songIn4.releaseDate !== 0 && <View style={styles.detailsItem}>
              <Text style={styles.detailsProperty}>Ngày phát hành</Text>

              <Text style={styles.detailsValue}>{ConvertTimestamp(songIn4.releaseDate).toString()}</Text>
            </View>
             }
            

            {/* {
              songIn4.releaseDate && <View>

              </View>
            } */}

            {songIn4.distributor
              && <View style={styles.detailsItem}>
                <Text style={styles.detailsProperty}>Nhà cung cấp</Text>

                <Text style={styles.detailsValue}>{songIn4.distributor}</Text>
              </View>
            }
          </View>
        </View>

        {songIn4.artists
          && <View>
            <Text style={styles.heading}>Thông tin nghệ sĩ</Text>

            <View style={styles.artistIn4Wrapper}>
              {songIn4.artists.map((item, index) => {
                return (
                  <View style={styles.artistWrapper} key={index}>
                    <Image style={styles.artistThumbnail} source={{ uri: item.thumbnailM }} />

                    <View style={styles.artistDetailsWrapper}>
                      <View style={styles.artistNameWrapper}>
                        <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>

                        <Text style={styles.totalFollow}>Số người theo dõi: {item.totalFollow}</Text>
                      </View>

                      <TouchableOpacity style={styles.seeMoreBtn}>
                        <Text style={styles.btnText}>Xem thông tin</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        }
      </ScrollView>
    )
  }
  else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.white} />
      </View>
    )
  }
}

export default memo(SongInformation)
