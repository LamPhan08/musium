import {StyleSheet} from 'react-native'
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10
    },

    avatar: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginRight: 10
    },

    commentIn4Wrapper: {
        flex: 1
    },

    commentContentWrapper: {
        backgroundColor: COLORS.lightBlack,
        borderRadius: 20, 
        padding: 10,
        gap: 10,
    },

    usernameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },

    username: {
        fontFamily: 'Mulish-Bold',
        fontSize: 13,
        maxWidth: 100
    },

    dotIcon: {
        fontSize: 13,
        color: COLORS.grey
    },

    createdAt: {
        fontFamily: 'Mulish-Regular',
        fontSize: 13,
        color: COLORS.grey
    },

    comment: {
        fontFamily: 'Mulish-Bold',
        color: COLORS.text,
        fontSize: 13
    },

    commentInteractionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: 5
    },

    likeBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    heartIcon: {
        fontSize: 20
    },

    likes: {
        fontFamily: 'Mulish-Regular',
        color: COLORS.text,
    },

    separator: {
        height: '50%',
        backgroundColor: COLORS.grey,
        width: 0.5,
        marginRight: 10
    },

    moreIcon: {
        fontSize: 20,
        color: COLORS.grey
    },

    reply: {
        fontFamily: 'Mulish-Bold',
        fontSize: 13,
        color: COLORS.grey
    }
})