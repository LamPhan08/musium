import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import styles from './newReleaseRanking.style'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ConvertTimestamp from '../../utils/convertTimestamp'
import { COLORS } from '../../constants/colors'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import TrackPlayer from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { setSongList } from '../../redux/songSlice'

const { width } = Dimensions.get('window')

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const NewReleaseRanking = ({ newReleaseRankingData }) => {
    const dispatch = useDispatch()

    let flatListRef = useRef();
    const [newReleaseRankingList, setNewReleaseRankingList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };

    const onViewRef = useRef(({ changed }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }
    });

    const handlePlayMusic = async (index) => {
        const queue = EditArrayForTrackPlayer(newReleaseRankingList)

        dispatch(setSongList(queue))

        await TrackPlayer.setQueue(queue)

        await TrackPlayer.skip(index)

        TrackPlayer.play()
    }

    useEffect(() => {
        (
            async () => {
                setNewReleaseRankingList(await CheckSongHasMp3(newReleaseRankingData.items, 'none', newReleaseRankingData.items.length))
            }
        )()
    }, [])

    useEffect(() => {
        let interval = setInterval(() => {
            if (currentIndex === newReleaseRankingData.items.length - 1) {
                scrollToIndex(0)
                setCurrentIndex(0)
            }
            else {
                scrollToIndex(currentIndex + 1)
                setCurrentIndex(currentIndex + 1)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentIndex])

    return (
        <SafeAreaView style={styles.newReleaseRankingContainer}>
            <TouchableOpacity style={styles.titleWrapper}>
                <Text style={styles.title}>{newReleaseRankingData.title}</Text>

                <Ionicons name='chevron-forward' style={styles.icon} />
            </TouchableOpacity>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={newReleaseRankingData.items}
                snapToInterval={width * 0.8 + 10}
                decelerationRate='fast'
                contentContainerStyle={{ gap: 10 }}
                onViewableItemsChanged={onViewRef.current}
                ref={(ref) => {
                    flatListRef.current = ref;
                }}
                viewabilityConfig={viewConfigRef}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.newReleaseWrapper} key={index} onPress={() => handlePlayMusic(index)}>
                            <Image source={{ uri: item.thumbnailM }} style={styles.thumbnail} />

                            <View style={styles.newReleaseDetails}>
                                <View style={styles.titleAndNameWrapper}>
                                    <Text style={styles.newReleaseTitle} numberOfLines={1}>{item.title}</Text>

                                    <Text style={styles.newReleaseArtistsNames} numberOfLines={1}>{item.artistsNames}</Text>
                                </View>

                                <View style={styles.rankingAndReleaseDateWrapper}>
                                    <Text
                                        style={[
                                            styles.ranking,
                                            {
                                                color: index === 0
                                                    ? COLORS.top1
                                                    : (index === 1
                                                        ? COLORS.top2
                                                        : (index === 2
                                                            ? COLORS.top3
                                                            : COLORS.grey))
                                            }
                                        ]}>
                                        #{index + 1}
                                    </Text>

                                    <Text style={styles.releaseDate}>{ConvertTimestamp(item.releaseDate)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default NewReleaseRanking
