import React, { useEffect, useRef, useState } from 'react'
import { View, Image, FlatList, TouchableOpacity, Text, Modal, Pressable, ToastAndroid } from 'react-native'
import { COLORS } from '../../constants/colors';
import styles from './banner.style'
import { getSongIn4, getSongMp3 } from '../../api/getData';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { setSongList } from '../../redux/songSlice';
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer';

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const Banner = ({ navigation, bannerDatas }) => {
    // console.log(bannerDatas)
    let flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [currentBannerSongClick, setCurrentBannerSongClick] = useState()

    const dispatch = useDispatch()

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };

    const onViewRef = useRef(({ changed }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }
    });

    const handleClickBanner = async (banner) => {
        // console.log(banner)
        switch (banner.type) {
            case 1: {
                const songIn4 = await getSongIn4(banner.encodeId)
                const songMp3 = await getSongMp3(banner.encodeId)

                songIn4.url = songMp3["128"]

                setCurrentBannerSongClick(songIn4)
                setOpenPopup(!openPopup)

                break;
            }

            case 3: {
                navigation.navigate('PlaylistDetails', {
                    playlistId: banner.encodeId,
                    playlistThumbnail: banner.banner
                })

                break;
            }

            case 4: {
                navigation.navigate('PlaylistDetails', {
                    playlistId: banner.encodeId,
                    playlistThumbnail: banner.banner
                })

                break;
            }

            default: {
                return;
            }
        }
    }

    const handlePlaySong = async () => {
        const queue = EditArrayForTrackPlayer([currentBannerSongClick])

        dispatch(setSongList(queue))
        
        await TrackPlayer.setQueue(queue)

        TrackPlayer.play()

        setOpenPopup(!openPopup)
    }

    const handleAddFavoriteList = () => {
        //Xử lý code để thêm vào danh sách yêu thích ở đây

        ToastAndroid.show('Đã thêm vào danh sách yêu thích của bạn!', ToastAndroid.SHORT)

        setOpenPopup(!openPopup)
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (currentIndex === bannerDatas.items.length - 1) {
                scrollToIndex(0)
                setCurrentIndex(0)
            }
            else {
                scrollToIndex(currentIndex + 1)
                setCurrentIndex(currentIndex + 1)
            }
        }, 10000)

        return () => clearInterval(interval)
    }, [currentIndex])


    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.title}>Đáng chú ý</Text>

            <View style={styles.flatList}>
                <FlatList
                    data={bannerDatas.items}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.bannerItem} key={index} onPress={() => handleClickBanner(item)}>
                                <Image source={{ uri: item.banner }} style={styles.bannerImage} />
                            </TouchableOpacity>
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onViewableItemsChanged={onViewRef.current}
                    ref={(ref) => {
                        flatListRef.current = ref;
                    }}
                    viewabilityConfig={viewConfigRef}
                />
            </View>

            <View style={styles.dotView}>
                {bannerDatas.items.map(({ }, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        style={[
                            styles.circle,
                            {
                                backgroundColor: index == currentIndex ? COLORS.white : COLORS.grey,
                                width: index === currentIndex ? 15 : 6,
                                height: 6
                            },
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>

            <Modal
                animationType='fade'
                visible={openPopup}
                transparent={true}
                onRequestClose={() => setOpenPopup(!openPopup)}
            >
                <Pressable style={styles.popupModal} onPress={() => setOpenPopup(!openPopup)} />

                <View style={styles.optionWrapper}>
                    <Image source={{ uri: currentBannerSongClick?.thumbnailM }} style={styles.bannerSongThumbnail} />

                    <Text style={styles.bannerSongTitle}>{currentBannerSongClick?.title}</Text>

                    <Text style={styles.bannerSongArtistsNames}>{currentBannerSongClick?.artistsNames}</Text>

                    <TouchableOpacity style={[styles.btn, {backgroundColor: COLORS.primary}]} onPress={handlePlaySong}>
                        <Ionicons name='play' style={styles.playSongBtnIcon} />

                        <Text style={[styles.btnText, {color: COLORS.text,}]}>
                            Phát bài hát
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, {borderColor: COLORS.primary, borderWidth: 1}]} onPress={handleAddFavoriteList}>
                        <Text style={[styles.btnText, {color: COLORS.primary}]}>
                            Thêm vào danh sách yêu thích
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backBtn} onPress={() => setOpenPopup(!openPopup)}>
                        <Text style={styles.backBtnText}>
                            Quay lại
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default Banner
