import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    searchScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
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

    noResultsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noResults: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
        color: COLORS.primary
    },

    searchResultList: {
        paddingHorizontal: 15,
        flex: 1,
    },

    itemWrapper: {
        // backgroundColor: 'red'
        marginTop: 10
    },

    heading: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 16,
    },

    viewAllBtn: {
        alignSelf: 'center',
        marginVertical: 10,
    },

    viewAll: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.primary
    },

    searchTabview: {
        flex: 1
    },

    recommendWrapper: {
        paddingHorizontal: 15,
        paddingTop: 10,
        flexWrap: 'wrap',
    },

    recommendListWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },  

    recommendBtn: {
        backgroundColor: COLORS.lightBlack,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10,
        marginVertical: 5,
    },

    recommend: { 
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
        fontSize: 13
    }
})