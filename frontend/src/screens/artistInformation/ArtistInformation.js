import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, ImageBackground, ActivityIndicator, Dimensions, Image } from 'react-native'
import styles from './artistInformation.style'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getArtist } from '../../api/getData'
import { COLORS } from '../../constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import FeaturedSongs from '../../components/featuredSongs/FeaturedSongs'
import ArtistPlaylistSlider from '../../components/artistPlaylistSlider/ArtistPlaylistSlider'
import ArtistSlider from '../../components/artistSlider/ArtistSlider'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'

const { width } = Dimensions.get('window')

const ArtistInformation = ({ navigation, route }) => {
  const { artistName, artistAlias } = route.params

  const [mp3FeaturedSongs, setMp3FeaturedSongs] = useState()
  const [isExpanded, setIsExpanded] = useState(false)
  const [artist, setArtist] = useState()

  const scrollY = useRef(new Animated.Value(0)).current;

  const handlePlay = () => {

  }

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  const opacity = scrollY.interpolate({
    inputRange: [width * 0.5, 400],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [width * 0.5, 500],
    outputRange: ['transparent', COLORS.headerBlack],
    extrapolate: 'clamp'
  })


  useEffect(() => {
    (
      async () => {
        const result = await getArtist(artistAlias)

        setArtist(result)

        for (const section of result.sections) {
          if (section.sectionType === 'song') {
            setMp3FeaturedSongs(await CheckSongHasMp3(section.items, 'none', section.items.length))

            break;
          }
        }
      }
    )()
  }, [artistAlias])

  return (
    <View style={styles.artistIn4Container}>
      <Animated.View style={[styles.header, { opacity: opacity, backgroundColor: headerBackgroundColor }]}>
        <View style={{ height: 23, width: 23 }}>
          <Text style={{ fontSize: 23 }}></Text>
        </View>

        <Text style={styles.headerArtistName}>
          {artistName}
        </Text>
      </Animated.View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' style={styles.headerIcon} />
      </TouchableOpacity>

      {artist && mp3FeaturedSongs
        ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          decelerationRate='fast'
          style={styles.searchResultList}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        // contentContainerStyle={{ gap: 5 }}
        >
          <ImageBackground source={{ uri: artist.thumbnailM }} style={styles.artistThumbnail}>
            <LinearGradient colors={['transparent', COLORS.background]} style={styles.artistNameWrapper}>
              <Text style={styles.artistName}>{artist.name}</Text>

              <Text style={styles.totalFollow}>{artist.totalFollow.toLocaleString()} người quan tâm</Text>
            </LinearGradient>
          </ImageBackground>

          {artist.sections
            &&
            <View style={styles.sectionWrapper}>
              {artist.sections.map((section, index) => {
                if (section.sectionType === 'song') {
                  if (mp3FeaturedSongs.length !== 0) {
                    return (
                      <View style={styles.featuredSongsWrapper} key={index}>
                        <View style={styles.headingWrapper}>
                          <Text style={styles.heading}>Bài hát nổi bật</Text>

                          <TouchableOpacity style={styles.playBtn} onPress={handlePlay}>
                            <Ionicons name='play' style={styles.playBtnIcon} />

                            <Text style={styles.btnText}>Phát</Text>
                          </TouchableOpacity>
                        </View>

                        <FeaturedSongs navigation={navigation} featuredSongs={mp3FeaturedSongs} />
                      </View>
                    )
                  }
                }
                else if (section.sectionType === 'playlist') {
                  return (
                    <ArtistPlaylistSlider key={index} navigation={navigation} playlistsData={section} />
                  )
                }
                else if (section.sectionType === 'artist') {
                  return (
                    <ArtistSlider key={index} navigation={navigation} artistsData={section} />
                  )
                }
              })}
            </View>
          }

          <View style={styles.artistDetailsWrapper}>
            <Text style={styles.heading}>Thông tin nghệ sĩ</Text>

            <View style={styles.thumbnailAndIn4}>
              <Image source={{ uri: artist.thumbnailM }} style={styles.smallThumbnail} />

              <View style={styles.in4Wrapper}>
                {artist.realname &&
                  <View style={styles.in4Item}>
                    <Text style={styles.in4Heading}>Tên thật</Text>

                    <Text style={styles.in4}>{artist.realname}</Text>
                  </View>
                }
                {artist.birthday &&
                  <View style={styles.in4Item}>
                    <Text style={styles.in4Heading}>Sinh nhật</Text>

                    <Text style={styles.in4}>{artist.birthday}</Text>
                  </View>
                }
                {artist.national &&
                  <View style={styles.in4Item}>
                    <Text style={styles.in4Heading}>Quốc gia</Text>

                    <Text style={styles.in4}>{artist.national}</Text>
                  </View>
                }
              </View>
            </View>

            <View style={styles.biographyWrapper}>
              <Text style={styles.biography}>Tiểu sử</Text>

              <Text style={styles.biography} numberOfLines={isExpanded ? 0 : 3}>
                {artist.biography.replaceAll('<br>', '\n')}
              </Text>

              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={[styles.btnText, {color: COLORS.primary}]}>{isExpanded ? 'Rút gọn' : 'Xem thêm'}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

        :
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.white} />
        </View>
      }
    </View>
  )
}

export default ArtistInformation
