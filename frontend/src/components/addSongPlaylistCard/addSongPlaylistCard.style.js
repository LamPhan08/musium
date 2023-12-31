import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    playlistCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        gap: 12,
    },

    playlistThumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    playlistIn4Wrapper: {
        flex: 1,
        gap: 5
    },

    title: {
        fontSize: 15,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
    },

    songTotal: {
        fontSize: 13,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    }
})