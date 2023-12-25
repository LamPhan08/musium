import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    playlistsContainer: {
        marginBottom: 35,
        gap: 35
    },

    playlistWrapper: {
        gap: 12
    },

    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        // backgroundColor: 'red'
    },

    title: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 20,
    },

    icon: {
        fontSize: 18,
        color: COLORS.white
    },

    playlistPreviewWrapper: {
        // backgroundColor: 'red'
        width: 150,
        gap: 7
    },

    thumbnail: {
        height: 150,
        width: 150,
        borderRadius: 5
    },

    playlistTitle: {
        color: COLORS.text,
        fontFamily: 'Mulish-Bold',
        fontSize: 14
    },

    playlistShortDescription: {
        color: COLORS.grey,
        fontSize: 13,
        fontFamily: 'Mulish-Regular'
    },

    artistsNames: {
        color: COLORS.grey,
        fontSize: 13,
        fontFamily: 'Mulish-Regular'
    }
})