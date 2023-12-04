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
    textInput: {
        flex: 1,
        fontSize: 18,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
      },
      action: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },

      label:{
        fontSize: 20,
        flex: 2,
        color: '#fff',
      }
})