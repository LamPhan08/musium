import {StyleSheet, Dimensions} from 'react-native'
import { COLORS } from '../../constants/colors'

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    newReleaseRankingContainer: {
        marginBottom: 35,
        gap: 12
    },

    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
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

    newReleaseWrapper: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: COLORS.itemBackground,
        borderRadius: 5,
        width: width * 0.8,
        alignItems: 'center'
        // backgroundColor: 'yellow',
    },

    thumbnail: {
        height: 115,
        width: 115,
        borderRadius: 5
    },

    newReleaseDetails: {
        // justifyContent: 'space-between',
        flex: 1
    },

    titleAndNameWrapper: {
        gap: 5,
        flex: 1
    },

    newReleaseTitle: {
        fontSize: 14,
        color: COLORS.text,
        fontFamily: 'Mulish-Bold'
    },

    newReleaseArtistsNames: {
        fontSize: 12,
        color: COLORS.grey,
        fontFamily: 'Mulish-Regular'
    },

    rankingAndReleaseDateWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },

    ranking: {
        fontSize: 40,
        includeFontPadding: false,
        fontFamily: 'Mulish-Bold',
    },

    releaseDate: {
        fontSize: 12,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    }
})