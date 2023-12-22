import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default styles = StyleSheet.create({
    allSearchContainer: {
        flex: 1,
        paddingHorizontal: 15,
        // marginVertical: 10
    },

    searchItem: {
        gap: 10,
        marginTop: 20
    },

    heading: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16,
    },

    viewMoreBtn: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: COLORS.lightBlack
    },

    btnText: {
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.text
    }
})