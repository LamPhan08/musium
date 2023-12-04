
import React, {useEffect, useContext, useState} from 'react';
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
import avatar from '../../../assets/images/avatar.png'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './editProfile.style'

const EditProfile = ({navigation}) => {
    return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}>
        <View style={{flexDirection: "row", justifyContent:"center"}}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10, flex:0.85 }}
          >
            <Ionicons  name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.label}> Chỉnh sửa hồ sơ</Text>
          <TouchableOpacity 
           style={{  flex:0.5 }}> 
            <Text style={styles.label}>
                 Lưu
            </Text>
            </TouchableOpacity>
          
          </View>
        <View style={{alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>

            <Image
           style = {styles.avatar}
            source={avatar} 
          />
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Tên của bạn"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        
</LinearGradient>
    )
}

export default EditProfile