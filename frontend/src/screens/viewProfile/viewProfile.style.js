import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingBottom: 10
    },
    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
      },
    
      headerIcon: {
        fontSize: 23,
        color: COLORS.white,
      },
    
      headerLabel: {
        flex: 1,
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center'
      },

      editBtn: {
        height: 23
      },

      editBtnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16
      },

      avatar: {
        marginTop: 50,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },

    in4Wrapper: {
        paddingHorizontal: 15,
        gap: 10,
        marginTop: 30
    },

    heading: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.grey,
        fontSize: 16,
        paddingHorizontal: 15
    },

    profileDetailsWrapper: {
        backgroundColor: COLORS.lightBlack,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        gap: 20
    },

    detailsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16
    },

    detail: {
        fontFamily: 'Mulish-Bold',
        fontSize: 15,
        color: COLORS.text
    },

    logoutBtn: {
        marginHorizontal: 15,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: COLORS.lightBlack,
        borderRadius: 10
    },

    btnText: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.primary,
        fontSize: 16
    }
})