import {StyleSheet, Dimensions} from 'react-native'
import { COLORS } from '../../constants/colors'

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    playlistDetailsContainer: {
        flex: 1,
    },

    darkView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        // backgroundColor: 'red',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
    },

    headerIcon: {
        fontSize: 23,
        color: COLORS.white
    },

    animatedView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },  

    playlistHeaderTitle: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.text
    },

    playHeaderButton: {
        borderWidth: 0.5,
        borderRadius: 50,
        borderColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },

    playBtnIcon: {
        fontSize: 20,
        color: COLORS.white
    },

    playlistIn4Wrapper: {
        paddingHorizontal: 15,
        gap: 8
        // paddingTop: 20
        // backgroundColor: 'red'
    },  

    playlistThumbnail: {
        // width: width * 0.65,
        // height: width * 0.65,
        resizeMode: 'contain',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 22
    },

    playlistTitle: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 20,
        flex: 1,
        marginBottom: 10
    },

    artistsNamesWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
    },

    artistsPlaylist: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        fontSize: 14,
        // backgroundColor: 'yellow'
    },

    artistBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    artistName: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.grey,
        fontSize: 14,
    },

    lastUpdateAndListen: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20
    },  

    playlistLastUpdate: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        fontSize: 14,
    },

    listenWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    headphoneIcon: {
        fontSize: 14,
        color: COLORS.white
    },

    listen: {
        fontFamily: 'Mulish-Regular',
        fontSize: 14,
        color: COLORS.text
    },

    playlistDescription: {
        fontSize: 15,
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        marginBottom: 15,
    },

    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    playlistSongTotal: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 13
    },

    icon: {
        fontSize: 25,
    },

    playBtn: {
        flexDirection: 'row',
        gap: 5,
        borderColor: COLORS.white,
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center'
    },

    btnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text
    },

    songList: {
        marginTop: 10,
        paddingHorizontal: 15
    }
})