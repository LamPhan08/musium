import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    featuredSongsWrapper: {
        paddingHorizontal: 15,
        // backgroundColor: 'red'
    },

    viewMoreBtn: {
        marginTop: 10,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: COLORS.lightBlack
    },

    btnText: {
        color: COLORS.text,
        fontFamily: 'Mulish-Regular'
    }
})