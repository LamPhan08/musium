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
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        
      },

      label:{
        fontSize: 20,
        flex: 2,
        color: '#fff',
      },

      sheet: {
        backgroundColor: "white",
        padding: 16,
        height: 350,
        width: "100%",
        position: "absolute",
        bottom: -20 * 1.1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1,
      },

      backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
      },

      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },

      panelTitle: {
        fontSize: 27,
        color: 'black',
        height: 35,
        marginBottom: 10,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#06A0B5',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
})