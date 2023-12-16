import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { COLORS } from '../../constants/colors'
import Banner from '../../components/banner/Banner'
import HomeNewRelease from '../../components/homeNewRelease/HomeNewRelease'
import avatar from '../../../assets/images/avatar.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './explore.style'
import { getHome } from '../../api/getData'
import PlaylistSlider from '../../components/playlistSlider/PlaylistSilder'
import NewReleaseRanking from '../../components/newReleaseRanking/NewReleaseRanking'

const Explore = ({ navigation }) => {
  const [homeData, setHomeData] = useState([])

  const handleNavigateSearch = () => {
    navigation.navigate('Search')
  }

  useEffect(() => {
    (
      async () => {
        const data = await getHome()

        setHomeData(data.items)
      }
    )()
  }, [])

  const bannerDatas = homeData.find(data => data.sectionType === 'banner')
  const newReleaseData = homeData.find(data => data.sectionType === 'new-release')
  const playlistData = homeData.filter(data => data.sectionType === 'playlist' && data.sectionId !== 'h100' && data.sectionId !== 'hAlbum')
  const top100AndHotAlbumData = homeData.filter(data => data.sectionId === 'h100' || data.sectionId === 'hAlbum')
  const newReleaseRankingData = homeData.find(data => data.sectionType === 'newReleaseChart')

  if (homeData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    )
  }
  else {
    return (
      <ScrollView style={styles.exploreContainer} showsVerticalScrollIndicator={false} decelerationRate={'fast'}>
        <View style={styles.avatarAndSearchContainer}>
          <Image source={avatar} style={styles.avatar} />

          <View style={styles.nameContainer}>
            <Text style={styles.welcome}>Xin chào!</Text>

            <Text style={styles.name}>John Doe</Text>
          </View>

          <TouchableOpacity onPress={handleNavigateSearch}>
            <Ionicons name='search' size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View>
          <Banner bannerDatas={bannerDatas} />

          <HomeNewRelease newReleaseData={newReleaseData} />

          <PlaylistSlider playlistData={playlistData} navigation={navigation} />

          <NewReleaseRanking newReleaseRankingData={newReleaseRankingData} />

          <PlaylistSlider playlistData={top100AndHotAlbumData} navigation={navigation} />

        </View>


      </ScrollView>
    )
  }
}

export default Explore
