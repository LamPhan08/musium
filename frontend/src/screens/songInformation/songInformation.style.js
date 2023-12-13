import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    songIn4Container: {
        // paddingTop: 20,
        paddingHorizontal: 15,
    },

    heading: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 10
    },

    songIn4Wrapper: {
        backgroundColor: 'rgba(169, 169, 169, 0.1)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 30
    },

    songTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    songThumbnail: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
        borderRadius: 7
    },

    titleAndArtistsWrapper: {
        flex: 1,
        // backgroundColor: 'red'
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

    likeAndListenWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 15
    },

    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    icon: {
        fontSize: 14,
        color: COLORS.grey
    },

    likeAndListen: {
        fontFamily: 'Mulish-Regular',
        fontSize: 12.5,
        color: COLORS.grey
    },

    songDetailsWrapper: {
        marginTop: 20,
        gap: 10
    },

    detailsItem: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },

    detailsProperty: {
        width: '33%',
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.text
    },

    detailsValue: {
        flex: 1,
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.text
    },

    artistIn4Wrapper: {
        gap: 20
    },  

    artistWrapper: {
        backgroundColor: 'rgba(169, 169, 169, 0.1)',
        borderRadius: 12
    },

    artistThumbnail: {
        height: 300,
        resizeMode: 'cover',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    artistDetailsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },

    artistNameWrapper: {
        flex: 1,
        gap: 10
    },

    artistName: {
        textTransform: 'uppercase',
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 15
    },

    totalFollow: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey,
        fontSize: 12
    },

    seeMoreBtn: {
        borderWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderColor: COLORS.white,
    },

    btnText: {
        textAlign: 'center',
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.white
    }
})