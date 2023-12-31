import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import styles from './artistPlaylistSlider.style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ArtistPlaylistSlider = ({ navigation, playlistsData }) => {
    const handleOpenPlaylist = (playlistItem) => {
        // navigation.navigate('PlaylistDetails', {
        //     playlistId: playlistItem.encodeId,
        //     playlistThumbnail: playlistItem.thumbnailM
        // })

        navigation.push('PlaylistDetails', {
            playlistId: playlistItem.encodeId,
            playlistThumbnail: playlistItem.thumbnailM
        })
    }

    const handleViewAll = () => {

    }

    return (
        <View style={styles.playlistsContainer}>
            <TouchableOpacity style={styles.titleWrapper}>
                <Text style={styles.title}>{playlistsData.title}</Text>

                <Ionicons name='chevron-forward' style={styles.icon} />
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 5 }}
                // style={{paddingHorizontal: 15}}
                decelerationRate='fast'
            >
                {playlistsData.items.map((playlistItem, index) => {
                    return (
                        <TouchableOpacity style={[styles.playlistPreviewWrapper, {marginRight: index === playlistsData.items.length - 1 ? 15 : 0}]} key={index} onPress={() => handleOpenPlaylist(playlistItem)}>
                            <Image source={{ uri: playlistItem.thumbnailM }} style={styles.thumbnail} />

                            <Text style={styles.playlistTitle} numberOfLines={2}>
                                {playlistItem.title}
                            </Text>

                            <Text style={styles.artistsNames} numberOfLines={1}>{playlistItem.artistsNames}</Text>
                        </TouchableOpacity>
                    )
                })}

                {/* {playlistsData.items.length > 5 &&
                    <TouchableOpacity style={styles.viewAllBtn} onPress={handleViewAll}>
                        <AntDesign name='arrowright' style={styles.viewAllBtnIcon}/>

                        <Text style={styles.btnText}>Xem tất cả</Text>
                    </TouchableOpacity>
                } */}
            </ScrollView>
        </View>
    )
}

export default ArtistPlaylistSlider
