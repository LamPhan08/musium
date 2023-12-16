import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    songThumbnailContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: '8%'
    },

    thumbnailWrapper: {
        alignItems: 'center', 
        justifyContent: 'center'
    },

    circleSoundAnimation: {
        height: width * 0.8,
        width: width * 0.8,
    },

    thumbnail: {
        height: width * 0.6,
        width: width * 0.6,
        resizeMode: 'contain',
        borderRadius: 200,
        position: 'absolute',
    },

    songDetailsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10,
        paddingHorizontal: 15,
        // backgroundColor: 'red',
        marginTop: '35%'
    },

    songTitleAndArtists: {
        flex: 1,
    },

    title: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16
    },

    artist: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey,
        fontSize: 12
    },

    icon: {
        fontSize: 25,
    },


})