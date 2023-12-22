import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    artistCard: {
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    artistThumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5
    },

    artistName: {
        fontSize: 15,
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        flex: 1
    },

    artist: {
        fontSize: 13,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
    },

    icon: {
        fontSize: 20,
        color: COLORS.grey,
    }
})