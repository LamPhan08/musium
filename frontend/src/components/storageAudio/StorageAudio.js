
import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import React , {useContext} from  "react";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../constants/colors";
import logo from '../../../assets/images/logo.png'
import TrackPlayer from "react-native-track-player";

const presableRippleConfig = {
  color: COLORS.primary
}
const StorageAudio = ({item}) => {
 const image = item.cover
 const playMusic = async () => {
  await TrackPlayer.setQueue([item])

  TrackPlayer.play()
 }

    return (
      <TouchableOpacity
      android_ripple={presableRippleConfig}
      onPress={() => playMusic()}
      style={styles.container}
      >
        {image ? <Image source={image} style={styles.image} /> : <Image source={logo} style={styles.image} /> }
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{item.artist}</Text>
          </View>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 0,
          }}
        >
        </View>
      </TouchableOpacity>
    );

  
}

export default StorageAudio

const styles = StyleSheet.create({ container: {
    width: '100%',
    padding: 10,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Mulish-Bold'
  },
  subtitle: {
    color: COLORS.grey,
    fontFamily: 'Mulish-Regular'
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});