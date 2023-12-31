import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import styles from './player.style'
import { useSelector } from 'react-redux'
import TrackPlayer, { useProgress, usePlaybackState } from 'react-native-track-player'
import Ionicons from 'react-native-vector-icons/Ionicons'
import soundWave from '../../../assets/images/soundWave.gif'
import staticSoundWave from '../../../assets/images/staticSoundWave.png'
import * as Progress from 'react-native-progress'
import { COLORS } from '../../constants/colors'
import logo from '../../../assets/images/logo.png'

const { width } = Dimensions.get('window')

const Player = ({ navigation }) => {
    const { song, songList } = useSelector(state => state.song)

    const playbackState = usePlaybackState()

    const progress = useProgress()

    // console.log(playbackState.state)


    const handlePause = () => {
        TrackPlayer.pause()

    }

    const handlePlay = () => {
        if (playbackState.state === 'paused') {
            TrackPlayer.play()
        }
        else {
            TrackPlayer.seekTo(0)
        }
    }

    const handleSkipToNext = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack()

        if (trackIndex === songList.length - 1) {
            TrackPlayer.skip(0)
        }
        else {
            TrackPlayer.skipToNext()
        }

        if (playbackState.state !== 'playing') {
            TrackPlayer.play()
        }
    }

    const handleSkipToPrevious = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack()

        if (trackIndex === 0) {
            TrackPlayer.skip(songList.length - 1)
        }
        else {
            TrackPlayer.skipToPrevious()
        }

        if (playbackState.state !== 'playing') {
            TrackPlayer.play()
        }
    }

    const handleOpenPlayerDetails = () => {
        navigation.navigate('PlayerDetails')
    }

    // console.log(playbackState.state)

    return (
        <TouchableOpacity onPress={handleOpenPlayerDetails}>
            <Progress.Bar
                borderRadius={0}
                borderWidth={0}
                progress={progress.duration !== 0 ? progress.position / progress.duration : 0}
                height={2}
                width={width}
                useNativeDriver={true}
                unfilledColor={'#252525'}
                color={COLORS.primary}

            />

            <View style={styles.playerContainer}>
                <Image
                    style={styles.playerThumbnail}
                    source={
                        (!song.thumbnail && !song.cover)
                            ? logo
                            : {
                                uri: song.thumbnail
                                    ? song.thumbnail
                                    : song.cover
                            }
                    }
                />

                <View style={styles.songDetails}>
                    <View style={styles.titleWrapper}>
                        <Image style={styles.soundWaveIcon} source={playbackState.state === 'playing' ? soundWave : staticSoundWave} />

                        <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                    </View>

                    <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
                </View>

                <View style={styles.playerControlContainer}>
                    <TouchableOpacity onPress={handleSkipToPrevious}>
                        <Ionicons name='play-skip-back' style={styles.controlIcon} />
                    </TouchableOpacity>

                    {playbackState.state === 'loading'
                        ? <ActivityIndicator size="small" color={COLORS.white} style={[styles.loadingAnimation, { width: 25 }]} />
                        : (playbackState.state === 'paused' || playbackState.state === 'ended'
                            ? <TouchableOpacity onPress={handlePlay}>
                                <Ionicons name='play' style={styles.controlIcon} />
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={handlePause} >
                                <Ionicons name='pause' style={styles.controlIcon} />
                            </TouchableOpacity>)
                    }

                    <TouchableOpacity onPress={handleSkipToNext}>
                        <Ionicons name='play-skip-forward' style={styles.controlIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Player
