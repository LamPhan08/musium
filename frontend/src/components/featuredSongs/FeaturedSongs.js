import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import styles from './featuredSongs.style'
import SongCard from '../songCard/SongCard'

const FeaturedSongs = ({navigation, featuredSongs }) => {
    const handleViewMore = () => {
        
    }
    
    return (
        <View style={styles.featuredSongsWrapper}>
            {featuredSongs.map((song, index) => {
                return (
                    <SongCard key={index} song={song} index={index} playlistSongs={EditArrayForTrackPlayer(featuredSongs)}/>
                )
            })}

            {/* <TouchableOpacity style={styles.viewMoreBtn} >
                <Text style={styles.btnText}>Xem thêm</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default FeaturedSongs
