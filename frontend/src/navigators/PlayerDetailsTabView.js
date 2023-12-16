import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import SongInformation from '../screens/songInformation/SongInformation'
import SongThumbnail from '../screens/songThumbnail/SongThumbnail'
import SongLyrics from '../screens/songLyrics/SongLyrics'
import { COLORS } from '../constants/colors'

const { width } = Dimensions.get('window')

const PlayerDetailsTabView = ({ onChangeTitle }) => {
    const [index, setIndex] = useState(1)

    const [routes] = useState([
        { key: 'SongInformation', title: 'Thông tin' },
        { key: 'SongThumbnail', title: 'Đang phát' },
        { key: 'SongLyrics', title: 'Lời bài hát' },
    ])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'SongInformation': {
                return <SongInformation />
            }

            case 'SongThumbnail': {
                return <SongThumbnail />
            }

            case 'SongLyrics': {
                return <SongLyrics />
            }

            default: {
                return null
            }
        }
    }

    useEffect(() => {
        onChangeTitle(routes[index].title)
    }, [index, routes, onChangeTitle])


    return (
        <TabView
            style={{ gap: 10, paddingBottom: 10 }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            lazy={true}
            
            initialLayout={width}
            lazyPreloadDistance={1}
            pointerEvents='none'
            renderTabBar={props => {
                return (
                    <TabBar
                        {...props}
                        style={{
                            height: 5,
                            alignSelf: 'center',
                            borderRadius: 20,
                            backgroundColor: 'rgba(169, 169, 169, 0.3)',
                            width: 60,
                        }}
                        indicatorStyle={{
                            height: null,
                            top: 0,
                            bottom: 0,
                            borderRadius: 20,
                            backgroundColor: COLORS.white,
                        }}
                        renderLabel={() => { }}
                        pressColor='transparent'
                    />
                )
            }}
        />
    )
}

export default PlayerDetailsTabView
