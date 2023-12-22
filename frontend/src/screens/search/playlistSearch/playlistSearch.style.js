import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default styles = StyleSheet.create({
    noPlaylistsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noPlaylists: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.primary
    },

    playlistList: {
        paddingHorizontal: 15
    }
})