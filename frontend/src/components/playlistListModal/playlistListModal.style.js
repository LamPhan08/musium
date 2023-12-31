import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: COLORS.headerBlack,
        flex: 1,
        paddingTop: 20,
    },

    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },

    invisibleView: {
        width: 25,
        height: 25,
    },

    label: {
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text
    },

    crossIcon: {
        fontSize: 25,
        color: COLORS.white
    },

    playlistListWrapper: {
        paddingTop: 20,
        paddingHorizontal: 15
    },

    tooltip: {
        fontFamily: 'Mulish-Regular',
        fontSize: 14,
        color: COLORS.grey,
        marginBottom: 10
    },

    addPlaylistBtn: {
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    addIconWrapper: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.lightBlack,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    addIcon: {
        fontSize: 25,
        color: COLORS.white
    },

    addPlaylistBtnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 15
    },
})