import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { COLORS } from '../../constants/colors';
import { getAll, SortSongFields, SortSongOrder } from "react-native-get-music-files";
import StorageAudio from '../../components/storageAudio/StorageAudio';
import styles from './downloadedSong.style'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';

const DownloadedSong = ({ navigation }) => {
  const [music, setMusic] = useState()

  const getMusicFiles = async () => {
    try {
      const allMusic = await getAll({
        limit: 100,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      });

      const songs = await allMusic.filter(song => song.url.endsWith('.mp3'))

      setMusic(songs)
    } catch (error) {
      console.error('Error getting music files:', error);
    }
  };

  const handlePlayAll = async () => {
    await TrackPlayer.setQueue(music)

    TrackPlayer.play()
  }

  
  const handleNavigateSearchSongs = () => {
    navigation.navigate('SearchSongs', { storageAudios: music })
  }

  useEffect(() => {
    getMusicFiles();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-left' style={styles.headerIcon} />
        </TouchableOpacity>

        <Text style={styles.headerLabel}>Nhạc Đã Tải</Text>

        <View style={styles.invisibleView} />
      </View>

      {music && music.length !== 0 &&
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.playAllBtn} onPress={handlePlayAll}>
            <Ionicons name='play' style={styles.playIcon} />

            <Text style={styles.all}>Tất cả ({music.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateSearchSongs}>
            <Ionicons name='search' style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      }

      {music
        ?
        (music.length !== 0
          ?
          <ScrollView
            style={styles.songList}
            showsVerticalScrollIndicator={false}
            decelerationRate='fast'
          >
            {music.map((item, index) => {
              return (
                <StorageAudio key={index} song={item} index={index} songList={music}/>
              )
            })}
          </ScrollView>

          :
          <View style={styles.noSongsWrapper}>
            <Ionicons name='musical-notes-outline' style={styles.musicIcon} />

            <Text style={styles.noSongs}>Chưa có bài hát!</Text>
          </View>)
        :
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      }
    </SafeAreaView>
  )
}


export default DownloadedSong