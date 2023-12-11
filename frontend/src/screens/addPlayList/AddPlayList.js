import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    Image,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './addPlayList.style'
import { useState } from 'react';
const AddPlayList = ({navigation}) => {
    const [name, setName] = useState("Playlist của tôi")

    return (
        <LinearGradient colors={["#424547", "#040306"]} style={{ flex: 1 }} >
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 140, marginBottom:20 }}>
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
                    onPress={()=>{
                        navigation.goBack()
                    }}
                    style={{
                        backgroundColor: 'transparent',
                        padding: 15,
                        borderRadius: 30,
                        marginBottom: 30,
                        marginEnd:30,
                        borderColor:"#f2f2f2",
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

        </LinearGradient>
    )
}

export default AddPlayList