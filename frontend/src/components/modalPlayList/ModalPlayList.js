import React, {useState} from 'react'
import {
    StyleSheet, Text, View, Dimensions,
    TouchableOpacity,TextInput,
} from 'react-native'

const Height_Modal = 400
const Width_Modal = Dimensions.get('window').width
import LinearGradient from 'react-native-linear-gradient';
 const ModalPlayList = (props) => {
    const [name, setName] = useState("Playlist của tôi")
    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}>
            <View style={styles.modal}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={styles.label}> Đặt tên cho danh sách phát của bạn</Text>
                </View>

                <View style={styles.action}>

                    <TextInput

                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center" }}>

                <TouchableOpacity
                    onPress={() => {
                        props.changeModalVisible()
                    }}
                    style={{
                        backgroundColor: 'transparent',
                        padding: 15,
                        borderRadius: 30,
                        marginBottom: 30,
                        marginEnd: 30,
                        borderColor: "#f2f2f2",
                        borderWidth: 0.5
                    }}>
                    <Text style={{
                        color: "white",
                        fontSize: 18,
                        marginHorizontal: 20
                    }}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#06A0B5',
                        padding: 15,
                        borderRadius: 30,
                        marginBottom: 30,
                    }}>
                    <Text style={{
                        color: "white",
                        fontSize: 18,
                        marginHorizontal: 20
                    }}>Tạo</Text>
                </TouchableOpacity>
            </View>
            </View>
           
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
    },
   
    modal:{
        height:250,
        backgroundColor:"#424547",
        marginTop:200,
        borderRadius:30
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        textAlign:"center",
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#fff',
        
      },
      action: {
        flexDirection: 'row',
        marginTop: 30,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f2f2f2',
      },

      label:{
        fontSize: 20,
        margin:20,
        color: '#fff',
        textAlign:"center"
      }
})
export default ModalPlayList