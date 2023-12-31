
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from './storageAudio.style'
import logo from '../../../assets/images/logo.png'
import TrackPlayer from "react-native-track-player";


const StorageAudio = ({ song, index, playlistSongs }) => {
  const playMusic = async () => {
    await TrackPlayer.setQueue([song])

    TrackPlayer.play()
  }

  return (
    <TouchableOpacity
      onPress={() => playMusic()}
      style={styles.songContainer}
    >
      <Image
        source={
          song.cover
            ? { uri: song.cover }
            : logo
        }
        style={styles.songThumbnail}
      />

      <View style={styles.songIn4Wrapper}>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
    </TouchableOpacity>
  );


}

export default StorageAudio
