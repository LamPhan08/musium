import React, { useState } from 'react'
import { Text, Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import AllSearch from '../screens/search/allSearch/AllSearch'
import SongSearch from '../screens/search/songSearch/SongSearch'
import PlaylistSearch from '../screens/search/playlistSearch/PlaylistSearch'
import ArtistSearch from '../screens/search/artistSearch/ArtistSearch'
import { COLORS } from '../constants/colors'

const {width} = Dimensions.get('window')

const SearchTabView = ({ navigation, searchResult }) => {
    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'AllSearch', title: 'Tất cả' },
        { key: 'SongSearch', title: 'Bài hát' },
        { key: 'PlaylistSearch', title: 'Playlist' },
        { key: 'ArtistSearch', title: 'Nghệ sĩ' },
    ])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'AllSearch': {
                return <AllSearch navigation={navigation} allSearchData={searchResult} switchTab={setIndex}/>
            }

            case 'SongSearch': {
                return <SongSearch songList={searchResult.songs}/>
            }

            case 'PlaylistSearch': {
                return <PlaylistSearch navigation={navigation} playlistList={searchResult.playlists}/>
            }

            case 'ArtistSearch': {
                return <ArtistSearch navigation={navigation} artistList={searchResult.artists}/>
            }

            default: {
                return null
            }
        }
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            lazy={true}
            swipeEnabled={false}
            renderTabBar={props => {
                return (
                    <TabBar
                        {...props}
                        style={{
                            backgroundColor: COLORS.itemBackground,
                            height: 40
                        }}
                        indicatorStyle={{
                            backgroundColor: COLORS.primary,
                            width: 50,
                            left: (width / 4 - 50) / 2
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            // backgroundColor: 'transparent',
                        }}
                        renderLabel={(props) => {
                            return (
                                <Text
                                    style={{ 
                                        fontFamily: 'Mulish-Bold',
                                        color: props.focused ? COLORS.primary : COLORS.grey
                                    }}
                                >
                                    {props.route.title}
                                </Text>
                            )
                        }}
                        pressColor='transparent'
                    />
                )
            }}
        />
    )
}

export default SearchTabView
