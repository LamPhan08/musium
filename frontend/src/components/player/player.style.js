import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        gap: 10,
        backgroundColor: COLORS.bottomTabBar,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },

    playerThumbnail: {
        height: 40,
        width: 40,
        borderRadius: 100,
    },

    songDetails:{
        justifyContent: 'space-between',
        flex: 1,
        // backgroundColor: 'red',
    },

    titleWrapper: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    soundWaveIcon: {
        height: 25,
        width: 25
    },  

    songTitle: {
        color: COLORS.text,
        fontFamily: 'Mulish-Bold',
        fontSize: 14
    },

    songArtist: {
        color: COLORS.grey,
        fontFamily: 'Mulish-Regular',
        fontSize: 11
    },

    playerControlContainer: {
        flexDirection: 'row',
        gap: 10
    },

    controlIcon: {
        fontSize: 25,
        color: COLORS.white,
    }
    
})