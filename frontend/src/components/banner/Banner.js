import React, { useEffect, useRef, useState } from 'react'
import { View, Dimensions, Image, FlatList, TouchableOpacity, Text } from 'react-native'
import styles from './banner.style'

const { width } = Dimensions.get('window')

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

const Banner = ({ bannerDatas }) => {
    let flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };

    const onViewRef = useRef(({ changed }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }
    });

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
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity style={styles.bannerItem}>
                                <Image source={{uri: item.banner}} style={styles.bannerImage} key={index} />
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
                                backgroundColor: index == currentIndex ? '#fff' : 'grey',
                                width: index === currentIndex ? 15 : 6,
                                height: 6
                            },
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </View>
    )
}

export default Banner
