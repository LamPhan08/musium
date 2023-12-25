import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    artistSlider: {
        gap: 20,
        marginBottom: 35
    },

    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 15
    },

    title: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 16,
    },

    icon: {
        fontSize: 18,
        color: COLORS.white
    },

    artistCard: {
        gap: 10,
        alignItems: 'center',
        marginLeft: 15
    },

    artistThumbnail: {
        width: 150,
        height: 150,
        borderRadius: 100
    },

    artistName: {
        color: COLORS.text,
        fontFamily: 'Mulish-Bold',
        fontSize: 14
    }
})