import {StyleSheet, Dimensions} from 'react-native'
import { COLORS } from '../../constants/colors'

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    newReleaseItemContainer: {
        gap: 5
    },
    newReleaseItem: {
        backgroundColor: COLORS.itemBackground,
        width: width * 0.8,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },

    thumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    newReleaseDetails: {
        flex: 1,
        gap: 5
    },

    titleContainer: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',

    },

    title: {
        fontSize: 14,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text
    },

    artistsNames: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    },

    releaseDate: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    },

    moreIcon: {
        fontSize: 25,
        color: COLORS.grey
    }

})