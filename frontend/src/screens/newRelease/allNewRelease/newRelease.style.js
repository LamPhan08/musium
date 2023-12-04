import {StyleSheet, Dimensions} from 'react-native'
import { COLORS } from '../../../constants/colors'

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    newReleaseList: {
        backgroundColor: COLORS.background
    },

    loadingContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: COLORS.background
    },

    dotsWrapper: {
        width: width * 0.25,
        
    },
})