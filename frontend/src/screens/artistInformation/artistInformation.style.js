import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get('window')

export default styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: COLORS.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    artistIn4Container: {
        backgroundColor: COLORS.background,
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        gap: 10,
        position: 'absolute',
        zIndex: 999,
        // backgroundColor: 'red'
    },

    backBtn: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 999
    },

    headerIcon: {
        fontSize: 23,
        color: COLORS.white,
    },

    headerArtistName: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.text
    },

    searchResultList: {

    },

    artistThumbnail: {
        width: '100%',
        resizeMode: 'cover',
        height: 400,
        justifyContent: 'flex-end'
    },

    artistNameWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
    },

    artistName: {
        textTransform: 'uppercase',
        fontSize: 25,
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        marginBottom: 5
    },

    totalFollow: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey,
        fontSize: 13
    },

    sectionWrapper: {
        paddingTop: 35
    },

    featuredSongsWrapper: {
        gap: 20,
        marginBottom: 35
    },

    headingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    heading: {
        flex: 1,
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 16,
        // backgroundColor: 'red'
    },

    playBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderColor: COLORS.white,
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },

    playBtnIcon: {
        fontSize: 25,
        color: COLORS.white
    },

    btnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text
    },

    artistDetailsWrapper: {
        paddingHorizontal: 15,
        gap: 20,
        marginBottom: 20
    },

    thumbnailAndIn4: {
        flexDirection: 'row',
        gap: 10
    },

    smallThumbnail: {
        height: 120,
        width: 120,
        borderRadius: 100
    },

    in4Wrapper: {
        backgroundColor: COLORS.itemBackground,
        flex: 1,
        // alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'space-around'
    },

    in4Item: {
        flexDirection: 'row',
        gap: 10
    },

    in4Heading: {
        width: '33%',
        fontFamily: 'Mulish-Regular',
        color: COLORS.text
    },

    in4: {
        flex: 1,
        fontFamily: 'Mulish-Regular',
        color: COLORS.text
    },

    biographyWrapper: {
        gap: 10
    },

    biography: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text
    }
})