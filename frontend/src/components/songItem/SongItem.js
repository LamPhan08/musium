import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React , {useContext} from  "react";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';



const SongItem = ({item}) => {
    const image = item?.album?.images?.[0];
  return (
    <Pressable
    onPress={() => console.log('Playing track: ', item.id)}
    style={styles.container}
    >
      {image && <Image source={{ uri: image.url }} style={styles.image} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.artists[0]?.name}</Text>
        </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        <AntDesign name="heart" size={24} color="#06A0B5" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
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
  },
  subtitle: {
    color: 'gray',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});