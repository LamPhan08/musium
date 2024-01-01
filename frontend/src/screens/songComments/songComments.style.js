import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'space-between'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        justifyContent: 'space-between',
    },

    headerIcon: {
        fontSize: 23,
        color: COLORS.white
    },

    headerLabel: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.text
    },

    invisibleView: {
        height: 23,
        width: 23
    },

    commentList: {
        paddingHorizontal: 15,
    },

    noCommentsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },

    commentIcon: {
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 18,
        borderRadius: 50,
        backgroundColor: COLORS.lightBlack,
        fontSize: 30,
        color: COLORS.grey,
    },

    noComments: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 15
    },

    tooltip: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.grey,
        fontSize: 13
    },

    loadingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    commentInputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: COLORS.itemBackground
    },

    userAvatar: {
        height: 40,
        width: 40,
        borderRadius: 50
    },

    inputWrapper: {
        backgroundColor: COLORS.lightBlack,
        borderRadius: 30,
        flex: 1,
        paddingHorizontal: 15,
    },

    input: {
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.text
    },

    postBtn: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    postIcon: {
        fontSize: 20
    }
})