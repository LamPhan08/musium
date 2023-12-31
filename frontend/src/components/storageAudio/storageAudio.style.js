import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default styles = StyleSheet.create({
    songContainer: {
        paddingVertical: 10,
        gap: 12,
        flexDirection: 'row',
        alignItems: 'center',
      },

      songThumbnail: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 5,
        backgroundColor: COLORS.lightBlack
      },

      songIn4Wrapper: {
        flex: 1,
        gap: 5,
      },

      title: {
        color: COLORS.text,
        fontSize: 15,
        fontFamily: 'Mulish-Bold'
      },

      artist: {
        fontSize: 13,
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey
      },
})