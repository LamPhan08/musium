import React, { useCallback, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Image, ScrollView, Text, View, TouchableOpacity, PermissionsAndroid, ToastAndroid, SafeAreaView, ActivityIndicator } from "react-native";
import avatar from '../../../assets/images/avatar.png'
import styles from './profile.style'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { setBottomTabRouteName } from '../../redux/songSlice';
import ModalAddPlayList from '../../components/modalAddPlayList/ModalAddPlayList';
import ProfilePlaylistCard from '../../components/profilePlaylistCard/ProfilePlaylistCard';
import { getPermissions } from '../../utils/getPermission';
import { getUserPlaylists } from '../../api/playlist';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Profile = ({ navigation }) => {
  const { user } = useSelector(state => state.song);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false)
  const [playlists, setPlaylists] = useState();
  // const [formData, setFormData] = useState({
  //   username: '',
  //   // password: '',
  //   photo: 'https://reactnative.dev/img/tiny_logo.png'
  // })

  const handleNavigateDownloadedSongs = async () => {
    const granted = await getPermissions();

    if (granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === 'granted' || granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === 'granted') {
      navigation.navigate("DownloadedSong")
    }
    else {
      ToastAndroid.show('Bạn chưa cấp quyền!', ToastAndroid.BOTTOM)
    }
  }

  const loadData = async () => {
    const result = await getUserPlaylists(user._id);

    if (result.length !== 0) {
      setPlaylists(result.playlists)
    }
    else {
      setPlaylists([])
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  )

  // useEffect(() => {

  //   const getUser = async () => {
  //     try {
        
  //       const getDataRespone = await mongoAPI.get(`/user/getuser/${user._id}`)
  //       setFormData({...getDataRespone.data})

  //     } catch (error) {
  //       console.error(error.message)
  //     }
  //   };

  //    getUser();
  // }, []);

  if (playlists) {
    return (
      <LinearGradient
        colors={[COLORS.primary, COLORS.background]}
        style={styles.profileContainer}
        locations={[0, 0.3]}
      >
        <View style={styles.darkenView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            decelerationRate='fast'
          >
            <View style={styles.userWrapper}>
              <Image
                style={styles.avatar}
                source={{
                  uri: user.photo,
                }}
              />
              <View style={styles.usernameWrapper}>
                <Text style={styles.username} numberOfLines={1}>
                  {user.username}
                </Text>
  
                <Text style={styles.hello}>Xin chào!</Text>
              </View>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  navigation.navigate("ViewProfile")
                }}
                style={styles.editProfileBtn}
              >
                <Text style={styles.profileActionText}>Xem hồ sơ</Text>
  
                <Ionicons name='chevron-forward' style={styles.editProfileIcon} />
              </TouchableOpacity>
            </View>
  
            <View style={styles.libraryWrapper}>
              <Text style={styles.heading}>Thư viện</Text>
  
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate='fast'
                contentContainerStyle={{ gap: 10 }}
              >
  
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setBottomTabRouteName('FavoritesStack'))
                    navigation.navigate('FavoritesStack')
                  }}
                  style={styles.libraryItem}>
                  <Ionicons name='heart-outline' size={30} color={COLORS.primary} />
                  <Text style={styles.libraryItemText}>Yêu thích</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={handleNavigateDownloadedSongs}
                  style={styles.libraryItem}>
                  <Feather name="arrow-down-circle" size={30} color="#5D3FD3" />
                  <Text style={styles.libraryItemText}>Đã tải</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
  
            <View style={styles.myPlaylistWrapper}>
              <Text style={styles.heading}>
                Playlist của bạn
              </Text>
  
              <ModalAddPlayList showPopup={showPopup} setShowPopup={setShowPopup} loadData={loadData}/>
  
              <TouchableOpacity style={styles.addPlaylistBtn} onPress={() => setShowPopup(true)}>
                <View style={styles.addIconWrapper}>
                  <FeatherIcon name="plus" style={styles.addIcon} />
                </View>
  
                <View style={styles.textWrapper}>
                  <Text style={styles.addPlaylistBtnText}>Tạo Playlist mới</Text>
  
                  <Text style={styles.toolTip}>Chỉ với vài bước để tạo Playlist</Text>
                </View>
              </TouchableOpacity>
  
              {playlists.map((playlist, index) => {
                return (
                  <ProfilePlaylistCard key={index} navigation={navigation} playlist={playlist} userId={user._id}/>
                )
              })}
            </View>
  
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary}/>
      </SafeAreaView>
    )
  }
}

export default Profile
