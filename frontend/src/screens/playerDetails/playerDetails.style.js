import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    playerDetailsContainer: {
        flex: 1
    },

    detailsWrapper: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' ,
        paddingVertical: 10,
        // paddingHorizontal: 15
    },

    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 15
    },

    toolbarIcon: {
        fontSize: 22,
        color: COLORS.white
    },

    title: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 13
    },

    playerControl: {
        height: '22%',
        paddingHorizontal: 15
    },

    slider: {
        width: width,
        alignContent: 'center',
        alignSelf: 'center'
    },

    durationWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    duration: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        fontSize: 12
    },

    controlWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },

    playPauseSkipController: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        gap: 20
    },

    controlIcon: {
        fontSize: 35,
        color: COLORS.white,
    },

    loadingAnimation: {
        width: 66,
        height: 66,
    },

    playPauseBtn: {
        // backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.white
    },
    
    animationView: {
        height: 60,
        width: 60,
        // backgroundColor: 'red'
    },

    optionBtn: {
        padding: 5,
        borderRadius: 5
    },

    othersWrapper: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    qualityWrapper: {
        backgroundColor: 'rgba(169, 169, 169, 0.3)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },

    quality: {
        textAlign: 'center',
        fontFamily: 'Mulish-Regular',
        fontSize: 12,
        color: COLORS.text
    },

    playlistIcon: {
        fontSize: 22,
        color: COLORS.white
    }
})