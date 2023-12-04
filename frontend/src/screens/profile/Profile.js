import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Image, ScrollView,Text,View, TouchableOpacity} from "react-native";
import avatar from '../../../assets/images/avatar.png'
import styles from './profile.style'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { tracks } from '../../../assets/data/tracks';
const Profile = ({navigation}) => {
  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}>
    <ScrollView style={{ marginTop: 20 }}>
      <View style={{ padding: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
           style = {styles.avatar}
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

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
       
          </View>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "500",
          marginHorizontal: 12,
          marginTop: 10
        }}
      >
        Your Playlists
      </Text>

      <View style={{padding:15}}>
          {tracks.map((item, index) => (
            <View style={{flexDirection:"row",alignItems:"center",gap:8,marginVertical:10}} key={index}>
              <Image
                source={{
                  uri:
                    item?.album?.images[0]?.url ||
                    "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                }}
                style={{ width: 50, height: 50, borderRadius: 4 }}
              />
              <View>
                <Text style={{color:"white"}}>{item?.name}</Text>
               
              </View>
            </View>
          ))}
        </View>
      
    </ScrollView>
  </LinearGradient>
  )
}

export default Profile
