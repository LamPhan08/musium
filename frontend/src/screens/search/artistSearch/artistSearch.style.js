import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default styles = StyleSheet.create({
    noArtistsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noArtists: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.primary
    },

    artistList: {
        paddingHorizontal: 15
    }
})