import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    favoriteSongsContainer: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        gap: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 999,
    },

    headerText: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 16,
        color: COLORS.primary,
        textTransform: 'uppercase'
    },

    imageBackground: {
        height: 300,
    },

    linearWrapper: {
        flex: 1,
        paddingVertical: 20,
        gap: 10
    },

    favoritesThumbnail: {
        width: 170,
        height: 170,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    heartIcon: {
        fontSize: 100,
        color: "rgba(255,255,255,0.5)"
    },

    favoritesTileWrapper: {
        paddingHorizontal: 15,
        gap: 10
    },

    favoritesTitle: {
        fontSize: 25,
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text
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

    noSongsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop: '30%'
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
    }
})