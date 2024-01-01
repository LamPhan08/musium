import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import SongInformation from '../screens/songInformation/SongInformation'
import SongThumbnail from '../screens/songThumbnail/SongThumbnail'
import SongLyrics from '../screens/songLyrics/SongLyrics'
import { COLORS } from '../constants/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState } from '../redux/songSlice'
import whiteSoundWave from '../../assets/images/whiteSoundWave.gif'
import whiteStaticSoundWave from '../../assets/images/whiteStaticSoundWave.png'
import TrackPlayer, { usePlaybackState } from 'react-native-track-player'
import OptionsBottomSheet from '../components/optionsBottomSheet/OptionsBottomSheet'
import logo from '../../assets/images/logo.png'

const { width } = Dimensions.get('window')

const PlayerDetailsTabView = ({ navigation, onChangeTitle, openPlaylist, setOpenPlaylist, isLiked, setIsLiked }) => {
    const [index, setIndex] = useState(1)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [bottomSheetSong, setBottomSheetSong] = useState()
    const [scroll, setScroll] = useState(false)

    const dispatch = useDispatch()

    const songFlatlistRef = useRef()

    const { songList, song, shuffledSongList } = useSelector(state => state.song)

    const playbackState = usePlaybackState()


    const [routes] = useState([
        { key: 'SongInformation', title: 'Thông tin' },
        { key: 'SongThumbnail', title: 'Đang phát' },
        { key: 'SongLyrics', title: 'Lời bài hát' },
    ])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'SongInformation': {
                return <SongInformation navigation={navigation} />
            }

            case 'SongThumbnail': {
                return <SongThumbnail navigation={navigation} isLiked={isLiked} setIsLiked={setIsLiked} />
            }

            case 'SongLyrics': {
                return <SongLyrics />
            }

            default: {
                return null
            }
        }
    }

    const handlePlaySong = async (index) => {

        await TrackPlayer.skip(index)

        dispatch(setPlayerState('playing'))

        if (playbackState.state === 'paused') {
            TrackPlayer.play()
        }
    }

    const handleShowBottomSheet = (item) => {
        setBottomSheetSong(item)
        setShowBottomSheet(!showBottomSheet)
    }

    const getItemLayout = (data, index) => ({
        length: 70,
        offset: 70 * index,
        index
    })

    const scrollToIndex = (index) => {
        songFlatlistRef.current?.scrollToIndex({ animated: true, index: index });
        setScroll(true)
    };

    useEffect(() => {
        onChangeTitle(routes[index].title)
    }, [index, routes, onChangeTitle])


    return (
        <View style={styles.tabviewContainer}>
            {/* <View pointerEvents={openPlaylist ? 'none' : 'auto'} style={{ flex: 1, opacity: openPlaylist ? 0 : 1, }}>
                
            </View> */}

            {openPlaylist ?
                <View style={styles.playlistContainer}>
                    <View style={styles.closeWrapper}>
                        <TouchableOpacity onPress={() => setOpenPlaylist(!openPlaylist)}>
                            <AntDesign name='close' style={styles.closeIcon} />
                        </TouchableOpacity>

                        <Text style={styles.playlist}>Danh sách phát ({songList.length})</Text>
                    </View>

                    <FlatList
                        ref={(ref) => {
                            songFlatlistRef.current = ref
                        }}
                        getItemLayout={getItemLayout}
                        data={shuffledSongList.length !== 0
                            ? shuffledSongList
                            : songList
                        }
                        showsVerticalScrollIndicator={false}
                        decelerationRate='fast'
                        style={styles.playlistWrapper}
                        // initialNumToRender={20}
                        // maxToRenderPerBatch={5}
                        // updateCellsBatchingPeriod={100}
                        // windowSize={20}
                        renderItem={({ item, index }) => {
                            // if (item.id === song.id && scroll) {
                            //     scrollToIndex(index)
                            // }

                            return (
                                <TouchableOpacity
                                    style={[styles.songCard,
                                    {
                                        backgroundColor: item.title === song.title
                                            ? 'rgba(169, 169, 169, 0.2)'
                                            : 'transparent'
                                    }]}
                                    key={index}
                                    onPress={() => handlePlaySong(index)}
                                >
                                    <Image
                                        source={
                                            (!item.thumbnail && !item.cover)
                                                ? logo
                                                : {
                                                    uri: item.thumbnail
                                                        ? item.thumbnail
                                                        : item.cover
                                                }
                                        }
                                        style={styles.songThumbnail} />

                                    <View style={styles.songDetails}>
                                        <View style={styles.songTitleWrapper}>
                                            {/* <Image source={playbackState.state === 'playing' ? soundWave : staticSoundWave} style={styles.soundWaveImage} /> */}

                                            {item.title === song.title
                                                && <Image source={playbackState.state === 'playing'
                                                    ? whiteSoundWave
                                                    : whiteStaticSoundWave} style={styles.soundWaveImage}
                                                />
                                            }

                                            <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
                                        </View>

                                        <Text style={styles.songArtistsNames} numberOfLines={1}>{item.artist}</Text>
                                    </View>

                                    {item.thumbnail &&
                                        <TouchableOpacity onPress={() => handleShowBottomSheet(item)}>
                                            <Feather name='more-vertical' style={styles.moreIcon} />
                                        </TouchableOpacity>
                                    }
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {bottomSheetSong &&
                        <OptionsBottomSheet
                            openBottomSheet={showBottomSheet}
                            setOpenBottomSheet={setShowBottomSheet}
                            song={{
                                encodeId: bottomSheetSong.id,
                                title: bottomSheetSong.title,
                                url: bottomSheetSong.url,
                                artistsNames: bottomSheetSong.artist,
                                thumbnailM: bottomSheetSong.thumbnail
                            }}
                        />
                    }
                </View>

                : <TabView
                    style={styles.tabView}
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
            }
        </View>
    )
}

export default PlayerDetailsTabView

const styles = StyleSheet.create({
    tabviewContainer: {
        flex: 1
    },

    tabView: {
        gap: 10,
        paddingBottom: 10
    },

    playlistContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    closeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    closeIcon: {
        fontSize: 23,
        color: COLORS.white,
    },

    playlist: {
        fontFamily: 'Mulish-Bold',
        fontSize: 15,
        color: COLORS.text
    },

    playlistWrapper: {
        marginTop: 10
    },

    songCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        gap: 12
    },

    songThumbnail: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 10,
        backgroundColor: COLORS.headerBlack
    },

    songDetails: {
        flex: 1,
        gap: 3,
    },

    songTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    soundWaveImage: {
        height: 20,
        width: 20
    },

    songTitle: {
        fontSize: 15,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        flex: 1
    },

    songArtistsNames: {
        fontSize: 13,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    },

    moreIcon: {
        fontSize: 25,
        color: COLORS.grey
    }
})
