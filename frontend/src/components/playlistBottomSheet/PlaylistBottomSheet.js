import React from 'react'
import { View, Text, TouchableOpacity, Pressable, Modal, Image, ToastAndroid } from 'react-native'
import styles from './playlistBottomSheet.style'
import logo from '../../../assets/images/logo.png'
import Feather from 'react-native-vector-icons/Feather'
import { deletePlaylist } from '../../api/playlist'

const PlaylistBottomSheet = ({ navigation, showBottomSheet, setShowBottomSheet, playlist, userId }) => {
    const handleDeletePlaylist = async () => {
        await deletePlaylist(userId, playlist._id)

        ToastAndroid.show(`Đã xóa Playlist ${playlist.title}`, ToastAndroid.BOTTOM)

        navigation.goBack()

        setShowBottomSheet(!showBottomSheet)
    }

    const handleChangeTitle = async () => {
        navigation.navigate('ChangePlaylistTitle', {playlist: playlist, userId: userId})

        setShowBottomSheet(!showBottomSheet)
    }
    
    return (
        <Modal
            transparent={true}
            visible={showBottomSheet}
            animationType='slide'
            onRequestClose={() => setShowBottomSheet(!showBottomSheet)}
        >
            <Pressable
                style={styles.backdrop}
                onPress={() => setShowBottomSheet(!showBottomSheet)}
            />

            <View style={styles.bottomSheet}>
                <View style={styles.playlistIn4Wrapper}>
                    <Image
                        source={playlist.songs.length !== 0
                            ? { uri: playlist.songs[0].thumbnailM }
                            : logo
                        }
                        style={styles.playlistThumbnail}
                    />

                    <View style={styles.songTitleArtistWrapper}>
                        <Text style={styles.playlistTitle}>{playlist.title}</Text>

                        <Text style={styles.playlistSongTotal}>{playlist.songs.length} bài hát</Text>
                    </View>
                </View>

                <View style={styles.optionsWrapper}>
                    <TouchableOpacity style={styles.optionBtn} onPress={handleChangeTitle}>
                        <Feather name='edit-2' style={styles.playlistIcon} />
                        
                        <Text style={styles.optionText}>Chỉnh sửa Playlist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionBtn} onPress={handleDeletePlaylist}>
                        <Feather name='trash-2' style={styles.playlistIcon} />

                        <Text style={styles.optionText}>Xóa Playlist</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default PlaylistBottomSheet
