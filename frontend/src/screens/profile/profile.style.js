import { StyleSheet } from "react-native";
import {COLORS} from '../../constants/colors'

export default styles = StyleSheet.create({
    avatar: {
        borderRadius: 100,
        width: 100,
        height: 100,
        marginRight: 15,
        borderWidth: 2.5, // Độ dày của border
        borderColor: COLORS.primary
    },
    profileAction: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 0.75,
       borderColor: 'gray',
      },
      profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
      },
      profile: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        width: 150
      },
})