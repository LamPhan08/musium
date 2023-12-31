import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, Image, View, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import styles from './changePlaylistTitle.style'
import Entypo from 'react-native-vector-icons/Entypo'
import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors'
import { changePlaylistTitle } from '../../api/playlist'

const ChangePlaylistTitle = ({ navigation, route }) => {
    const { playlist, userId, } = route.params;

    const [title, setTitle] = useState(playlist.title)

    const handleChangeTitle = async () => {
        await changePlaylistTitle(userId, playlist._id, title)

        ToastAndroid.show('Đổi thành công!', ToastAndroid.BOTTOM)

        navigation.goBack()
    }


    return (
        <SafeAreaView style={styles.changeTitleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name='chevron-thin-left' style={styles.headerIcon} />
                </TouchableOpacity>

                <Text style={styles.headerLabel} numberOfLines={1}>Chỉnh sửa Playlist</Text>

                <TouchableOpacity
                    onPress={handleChangeTitle}
                    disabled={title === playlist.title || title === ''
                        ? true
                        : false
                    }
                >
                    <Text
                        style={[
                            styles.headerBtnText,
                            {
                                color: title === playlist.title || title === ''
                                    ? 'rgba(0, 194, 203, 0.2)'
                                    : COLORS.primary
                            }
                        ]}
                    >
                        Xong
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.playlistIn4Wrapper}>
                <Image
                    source={
                        playlist.songs.length !== 0
                            ? { uri: playlist.songs[0].thumbnailM }
                            : logo
                    }
                    style={styles.playlistThumbnail}
                />

                <Text style={styles.label}>Tên Playlist</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholderTextColor={COLORS.grey}
                        placeholder='Nhập tên Playlist'
                        autoCorrect={false}
                        style={styles.textInput}
                        value={title}
                        cursorColor={COLORS.primary}
                        onChangeText={text => setTitle(text)}
                    />

                    {title !== '' &&
                        <TouchableOpacity>
                            <Entypo name="cross" style={styles.crossIcon} onPress={() => setTitle('')} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChangePlaylistTitle
