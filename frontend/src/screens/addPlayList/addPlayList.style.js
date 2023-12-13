import { StyleSheet } from "react-native";
import {COLORS} from '../../constants/colors'

export default styles = StyleSheet.create({
    
    textInput: {
        flex: 1,
        fontSize: 30,
        textAlign:"center",
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#fff',
        
      },
      action: {
        flexDirection: 'row',
        marginTop: 30,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 70,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f2f2f2',
      },

      label:{
        fontSize: 25,
        margin:20,
        color: '#fff',
        textAlign:"center"
      }
})