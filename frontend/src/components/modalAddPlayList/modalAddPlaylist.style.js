import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const { width, height } = Dimensions.get('window')

export default styles = StyleSheet.create({
    popupModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal: {
        width: width * 0.8,
        height: height * 0.35,
        backgroundColor: COLORS.lightBlack,
        borderRadius: 12,
        justifyContent: 'space-between',
        position: 'absolute',
        top: '30%',
        left: width / 2 - (width * 0.8) / 2,
        paddingHorizontal: 15,
        paddingVertical: 20
    },

    inputWrapper: {
        gap: 20
    },
    
    label: {
        alignSelf: 'center',
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 20,
        color: COLORS.text
    },

    textInput: {
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 0.5,
        height: 40,
        padding: 0,
        fontFamily: 'Mulish-Bold',
        fontSize: 15,
        color: COLORS.text
    },

    btnWrapper: {
        // alignItems: 'center',
        gap: 20
    },
    
    cancelBtn: {
        alignSelf: 'center',
    },

    createBtn: {
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20
    },

    createBtnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        
    },

    cancelBtnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.grey
    }
})