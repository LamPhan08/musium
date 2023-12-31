import { StyleSheet,Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const {width} = Dimensions.get('window')

export default styles = StyleSheet.create({
    changeTitleContainer: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
    },

    headerIcon: {
        fontSize: 23,
        color: COLORS.white
    },

    headerLabel: {
        flex: 1,
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.text
    },

    headerBtnText: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 16
    },

    playlistIn4Wrapper: {
        marginTop: 20,
        paddingHorizontal: 15
    },

    playlistThumbnail: {
        height: width * 0.65,
        width: width * 0.65,
        alignSelf: 'center',
        backgroundColor: COLORS.lightBlack,
        borderRadius: 5,
        marginBottom: 20
    },

    label: {
        fontFamily: 'Mulish-Bold',
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 10
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightBlack,
        borderRadius: 10,
        paddingHorizontal: 10,
        gap: 5,
    },

    textInput: {
        flex: 1,
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        fontSize: 14
    },

    crossIcon: {
        fontSize: 22,
        color: COLORS.grey,
    }
})