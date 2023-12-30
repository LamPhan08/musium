import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    playerDetailsContainer: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    darkView: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
    },

    headerIcon: {
        fontSize: 23,
        color: COLORS.white
    },

    animatedView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12
    },

    playlistHeaderTitle: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.text
    },

    playlistIn4Wrapper: {
        paddingHorizontal: 15,
        gap: 8
    },

    playlistThumbnail: {
        resizeMode: 'contain',
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: COLORS.lightBlack,
        marginBottom: 5
    },

    playlistTitle: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 20,
        flex: 1,
        marginBottom: 5,
    },

    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    avatar: {
        height: 40,
        width: 40,
        borderRadius: 50
    },

    username: {
        fontFamily: 'Mulish-Regular',
        fontSize: 14,
        color: COLORS.text,
        flex: 1
    },

    playBtn: {
        flexDirection: 'row',
        gap: 5,
        borderRadius: 20,
        padding: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center'
    },

    playIcon: {
        fontSize: 20,
        color: COLORS.text
    },

    songListWrapper: {
        paddingHorizontal: 15,
        marginTop: 10
    },

    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    playlistSongTotal: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 14
    },

    searchIcon: {
        fontSize: 22,
        color: COLORS.grey
    },

    noSongsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop: '20%'
    },

    musicIcon: {
        padding: 20,
        borderRadius: 50,
        backgroundColor: COLORS.lightBlack,
        fontSize: 30,
        color: COLORS.grey
    },

    noSongs: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.grey,
        fontSize: 15
    },
})