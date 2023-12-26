import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
    },

    bottomSheet: {
        backgroundColor: COLORS.headerBlack,
        width: "100%",
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 25,
        zIndex: 999
    },

    songIn4Wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 20
    },

    songThumbnail: {
        height: 60,
        width: 60,
        borderRadius: 5
    },

    songTitleArtistWrapper: {
        flex: 1,
        gap: 5
    },

    songTitle: {
        fontSize: 14,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text
    },

    songArtistsNames: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    },

    optionBtn: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },

    icon: {
        fontSize: 25,
    },

    optionText: {
        color: COLORS.text,
        fontFamily: 'Mulish-Bold'
    }
})