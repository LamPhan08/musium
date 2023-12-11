import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import React , {useContext} from  "react";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from "../../constants/colors";
import { PressableAndroidRippleConfig } from "react-native";
 
const presableRippleConfig = {
  color: COLORS.primary
}


const SongItem = ({item}) => {
    const image = item?.album?.images?.[0];
  return (
    <TouchableOpacity
    android_ripple={presableRippleConfig}
    onPress={() => console.log('Playing track: ', item.id)}
    style={styles.container}
    >
      {image && <Image source={{ uri: image.url }} style={styles.image} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{item.artists[0]?.name}</Text>
        </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 0,
        }}
      >
        <TouchableOpacity>
        <AntDesign name="heart" size={24} color="#06A0B5" />
        </TouchableOpacity>

        <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
        </TouchableOpacity>
        
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

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