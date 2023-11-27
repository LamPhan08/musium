import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    newReleaseContainer: {
        height: 330,
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
})