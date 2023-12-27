import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Image, ScrollView, Text, View, TouchableOpacity, Pressable, PermissionsAndroid, Linking } from "react-native";
import avatar from '../../../assets/images/avatar.png'
import styles from './profile.style'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { tracks } from '../../../assets/data/tracks';
import Feather from 'react-native-vector-icons/Feather';
const Profile = ({ navigation }) => {

  const requestPermission = async()=>{
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    ]);
    console.log("granted", granted)
    return granted
  }
  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ padding: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={styles.avatar}
              source={avatar}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                John Doe
              </Text>
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                johndoe@gmail.com
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
              navigation.navigate("EditProfile")
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}> Chỉnh sửa </Text>

              <FontAwesome color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Pressable
            onPress={() => {
              requestPermission()
              navigation.navigate("Downloaded")
            }}
            style={{ width: 130, height: 100, borderRadius: 5, backgroundColor: "#222222", margin: 10, padding: 15 }}>
            <Feather name="arrow-down-circle" size={30} color="#06A0B5" />
            <Text style={{ marginTop: 15, color: "white", fontSize: 15, fontWeight: "bold" }}>Đã tải</Text>
          </Pressable>

          {/* <Pressable
            onPress={async() => {
              const permissionStatus = await requestPermission()
              if(permissionStatus[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === 'granted' || permissionStatus[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === 'granted' )
              {
                navigation.navigate("LocalAudio")
              }
              
            }}
            style={{ width: 130, height: 100, borderRadius: 5, backgroundColor: "#222222", margin: 10, padding: 15 }}>
            <FontAwesome name="folder" size={30} color="#D4AC0D" />
            <Text style={{ marginTop: 10, color: "white", fontSize: 15, fontWeight: "bold" }}>Audio trong máy</Text>
          </Pressable> */}
        </View>



        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 12,
              marginTop: 10,
              flex: 1
            }}
          >
            Playlist của bạn
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("AddPlayList")
          }}>
            <FeatherIcon name="plus" color="#fff" size={30} />
          </TouchableOpacity>

        </View>


        <View style={{ padding: 15 }}>
          {tracks.map((item, index) => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 }} key={index}>
              <Image
                source={{
                  uri:
                    item?.album?.images[0]?.url ||
                    "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                }}
                style={{ width: 50, height: 50, borderRadius: 4 }}
              />
              <View>
                <Text style={{ color: "white" }}>{item?.name}</Text>

              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default Profile
