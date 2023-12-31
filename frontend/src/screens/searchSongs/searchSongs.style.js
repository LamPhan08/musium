import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: COLORS.itemBackground
    },

    backIcon: {
        fontSize: 22,
        color: COLORS.white
    },

    songList: {
        paddingHorizontal: 15,
    },

    noResultsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noResults: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.primary
    }
})