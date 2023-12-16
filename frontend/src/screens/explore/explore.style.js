import { StyleSheet } from "react-native";
import {COLORS} from '../../constants/colors'

export default styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    
    exploreContainer: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 15,
        flex: 1
    },

    avatarAndSearchContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        alignItems: 'center',
        // paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20
    },

    avatar: {
        borderRadius: 100,
        width: 50,
        height: 50,
        marginRight: 15,
        borderWidth: 2.5, // Độ dày của border
        borderColor: COLORS.primary
    },

    nameContainer: {
        // backgroundColor: 'green',
        flex: 1,
        gap: 5, 
    },

    welcome: {
        fontFamily: 'Mulish-ExtraBold',
        color: COLORS.text,
        fontSize: 15
    },

    name: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.grey,
        fontSize: 12
    }
})