import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    noLyricsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noLyrics: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16
    },

    songLyricsContainer: {
        paddingHorizontal: 15,
        flex: 1
        // gap: 10
    },

    songWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    songThumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    titleAndArtistsWrapper: {
        gap: 5,
        flex: 1
    },

    songTitle: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 15
    },

    songArtists: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey,
        fontSize: 12.5
    },

    lyricsWrapper: {
        alignItems: 'center',
        gap: 5,
    },

    lyricBtn: {
        paddingVertical: 5,
        borderRadius: 8,
        // backgroundColor: 'rgba(169, 169, 169, 0.2)'
    },

    lyric: {
        fontFamily: 'Mulish-Bold',
        fontSize: 15,
        color: COLORS.text,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        textAlign: 'center'
    }
})