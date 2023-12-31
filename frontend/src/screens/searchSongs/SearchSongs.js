import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, } from 'react-native';
import styles from './searchSongs.style';
import SearchBar from '../../components/searchBar/SearchBar';
import Entypo from 'react-native-vector-icons/Entypo'
import SongCard from '../../components/songCard/SongCard';
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer';
import { debounce } from 'lodash';

const SearchSongs = ({ navigation, route }) => {
    const { songs } = route.params
    const [songList, setSongList] = useState(songs)
    const [searchText, setSearchText] = useState('')
    const [focus, setFocus] = useState(false)

    const handleFind = () => {

    }

    const delaySearch = debounce(async () => {
        if (searchText !== '') {
            const filteredSongs = songs.filter((song) =>
                song.title.toLowerCase().includes(searchText.toLowerCase()) ||
                song.artistsNames.toLowerCase().includes(searchText.toLowerCase())
            );

            setSongList(filteredSongs);
        }
        else {
            setSongList(songs)
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

            {songList.length !== 0
                ?
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
                :
                <View style={styles.noResultsWrapper}>
                    <Text style={styles.noResults}>Không có kết quả tìm kiếm</Text>
                </View>
            }

        </SafeAreaView>
    )
}

export default SearchSongs
