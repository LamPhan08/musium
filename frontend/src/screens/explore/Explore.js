import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { COLORS } from '../../constants/colors'
import Banner from '../../components/banner/Banner'
import HomeNewRelease from '../../components/homeNewRelease/HomeNewRelease'
import avatar from '../../../assets/images/avatar.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './explore.style'
import { getHome } from '../../api/getData'
import PlaylistSlider from '../../components/homePlaylistSlider/HomePlaylistSilder'
import NewReleaseRanking from '../../components/newReleaseRanking/NewReleaseRanking'
import { useSelector, useDispatch } from 'react-redux'
import { setBottomTabRouteName } from '../../redux/songSlice'
import { getExploreData } from '../../api/explore'
import { mongoAPI } from '../../axios/axios'
const Explore = ({ navigation }) => {
  const [homeData, setHomeData] = useState([])
  const { user } = useSelector(state => state.song)
  const dispatch = useDispatch()
  // const [formData, setFormData] = useState({
  //   username: '',
  //   // password: '',
  //   photo: 'https://reactnative.dev/img/tiny_logo.png'
  // })

  const handleNavigateSearch = () => {
    navigation.navigate('Search')
  }

  const checkUserLoggedIn = async () => {
    try {
      // Retrieve user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem('userData');
  
      // If user data is present, parse it and return the "data" property
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData.data;
      } else {
        // If no user data, return null
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user data from AsyncStorage:', error);
      // Handle the error (e.g., display an error message)
      return null;
    }
  };

  useEffect(() => {
    (
      async () => {
        // //Lấy data mới nhất
        // const data = await getHome()

        // setHomeData(data.items)

        //Lấy data từ mongodb
        const result = await getExploreData()

        setHomeData(result.data.items)

        // const getUser = async () => {
        //   try {
            
        //     const getDataRespone = await mongoAPI.get(`/user/getuser/${user._id}`)
        //     setFormData({...getDataRespone.data})
    
        //   } catch (error) {
        //     console.error(error.message)
        //   }
        // };
    
        //  getUser();
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
          <TouchableOpacity
            onPress={() => {
              dispatch(setBottomTabRouteName('Profile'))
              navigation.navigate('Profile')
            }}>
            <Image source={{
                  uri: user.photo,
                }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={styles.nameContainer}>
            <Text style={styles.welcome}>Xin chào!</Text>

            <Text style={styles.name}>{user.username}</Text>
          </View>

          <TouchableOpacity onPress={handleNavigateSearch}>
            <Ionicons name='search' size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View>
          <Banner bannerDatas={bannerDatas} navigation={navigation} />

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
