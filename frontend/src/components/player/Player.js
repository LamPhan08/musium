import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './player.style'
import { useDispatch, useSelector } from 'react-redux'
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setSong } from '../../redux/songSlice'
import soundWave from '../../../assets/images/soundWave.gif'
import staticSoundWave from '../../../assets/images/staticSoundWave.png'

const Player = () => {
    const { song, songList } = useSelector(state => state.song)
    const [playerState, setPlayerState] = useState()
    const dispatch = useDispatch()

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async event => {
        const trackIndex = await TrackPlayer.getCurrentTrack()
        const trackObject = await TrackPlayer.getTrack(trackIndex)

        if (event.state === 'playing' || event.state === 'paused') {
            setPlayerState(event.state)
        }

        dispatch(setSong(trackObject))

    })


    const handlePause = () => {
        TrackPlayer.pause()
    }

    const handlePlay = () => {
        TrackPlayer.play()
    }

    const handleSkipToNext = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack()

        if (trackIndex === songList.length - 1) {
            TrackPlayer.skip(0)
        }
        else {
            TrackPlayer.skipToNext()
        }

        if (playerState !== 'playing') {
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

        if (playerState !== 'playing') {
            TrackPlayer.play()
        }


    }

    return (
        <View style={styles.playerContainer}>
            <Image style={styles.playerThumbnail} source={{ uri: song.thumbnail }} />

            <View style={styles.songDetails}>
                <View style={styles.titleWrapper}>
                    <Image style={styles.soundWaveIcon} source={playerState === 'playing' ? soundWave : staticSoundWave} />

                    <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                </View>

                <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
            </View>

            <View style={styles.playerControlContainer}>
                <TouchableOpacity onPress={handleSkipToPrevious}>
                    <Ionicons name='play-skip-back' style={styles.controlIcon} />
                </TouchableOpacity>

                {playerState !== 'paused'
                    ? <TouchableOpacity onPress={handlePause}>
                        <Ionicons name='pause' style={styles.controlIcon} />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={handlePlay}>
                        <Ionicons name='play' style={styles.controlIcon} />
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={handleSkipToNext}>
                    <Ionicons name='play-skip-forward' style={styles.controlIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Player
