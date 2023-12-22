import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noSongsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noSongs: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.primary
    },

    songList: {
        paddingHorizontal: 15
    }
})