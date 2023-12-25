import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    playlistsContainer: {
        marginBottom: 35,
        gap: 20,
    },

    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 15
        // backgroundColor: 'red'
    },

    title: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 16,
    },

    icon: {
        fontSize: 18,
        color: COLORS.white
    },

    playlistPreviewWrapper: {
        // backgroundColor: 'red'
        // marginRight: 15,
        marginLeft: 15,
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
    },

    viewAllBtn: {
        // justifyContent: 'center',
        marginRight: 15,
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewAllBtnIcon: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: COLORS.lightBlack,
        fontSize: 18
    },

    btnText: {
        fontFamily: 'Mulish-Regular',
        fontSize: 12,
        color: COLORS.text
    }
})