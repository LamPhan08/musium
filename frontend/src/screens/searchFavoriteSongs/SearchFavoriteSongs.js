import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './searchFavoriteSongs.style';
import SearchBar from '../../components/searchBar/SearchBar';
import Entypo from 'react-native-vector-icons/Entypo'
import SongCard from '../../components/songCard/SongCard';
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer';
import { debounce } from 'lodash';

const SearchFavoriteSongs = ({ navigation, route }) => {
    const { favoriteSongs } = route.params
    const [songList, setSongList] = useState(favoriteSongs)
    const [searchText, setSearchText] = useState('')
    const [focus, setFocus] = useState(false)

    const handleFind = () => {

    }

    const delaySearch = debounce(async () => {
        if (searchText !== '') {
            const filteredSongs = favoriteSongs.filter((song) =>
            song.title.toLowerCase().includes(searchText.toLowerCase()) ||
            song.artistsNames.toLowerCase().includes(searchText.toLowerCase())
          );
    
          setSongList(filteredSongs);
        }   
        else {
            setSongList(favoriteSongs)
        }
    }, 100)

    useEffect(() => {
        delaySearch()

        return () => delaySearch.cancel()
    }, [searchText])


    return (
        <SafeAreaView style={styles.searchContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name='chevron-thin-down' style={styles.backIcon} />
                </TouchableOpacity>

                <SearchBar searchText={searchText} setSearchText={setSearchText} setFocus={setFocus} handleFind={handleFind} />
            </View>

            <FlatList
                data={songList}
                showsVerticalScrollIndicator={false}
                style={styles.songList}
                renderItem={({ item, index }) => {
                    return (
                        <SongCard
                            key={index}
                            index={index}
                            song={item}
                            playlistSongs={EditArrayForTrackPlayer(songList)}
                            notShowMenuBtn={true}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default SearchFavoriteSongs
