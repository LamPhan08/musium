import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    songContainer: {
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        // backgroundColor: 'red'
    },

    songThumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    songDetails: {
        flex: 1,
        gap: 3,
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

    moreIcon: {
        fontSize: 20,
        color: COLORS.grey
    }
})