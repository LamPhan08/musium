import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    searchBarcontainer: {
        flexDirection: 'row',
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: COLORS.lightBlack,
        paddingHorizontal: 10,
        gap: 5,
        flex: 1
    },

    searchIcon: {
        fontSize: 18,
        color: COLORS.grey
    },

    input: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        flex: 1,
        height: 40,
        fontSize: 13,
    },

    crossIcon: {
        fontSize: 22,
        color: COLORS.grey,
    }
})