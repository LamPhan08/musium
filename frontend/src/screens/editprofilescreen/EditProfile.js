
import React, { useEffect, useContext, useState } from 'react';
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut } from "react-native-reanimated";
import ImagePicker from 'react-native-image-crop-picker'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("John Doe")
  const [password, setPassWord] = useState("password")
  const [img, setImg] = useState(avatar)
  const [isOpen, setOpen] = useState(false);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then(image => {
      console.log('image', image);
      setImg(image.path);
    });
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then( image  => {
      console.log('image', image.path);
     setImg(image.path);
      console.log("test",img)
    });
  }

  const toggleSheet = () => {
    setOpen(!isOpen);
  };

  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}  >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10, flex: 0.85 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.label}> Chỉnh sửa hồ sơ</Text>
        <TouchableOpacity
          style={{ flex: 0.5 }}>
          <Text style={styles.label}>
            Lưu
          </Text>
        </TouchableOpacity>

      </View>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity
          onPress={toggleSheet}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Image
              style={styles.avatar}
              source={img}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user" color="#666666" size={20} />
        <TextInput
          placeholder="Tên của bạn"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={styles.action}>
        <FontAwesome name="lock" color="#666666" size={20} />
        <TextInput
          secureTextEntry={true}
          placeholder="Mật khẩu"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={password}
          onChangeText={text => setPassWord(text)}
        />
      </View>

      {isOpen && (
        <>
              <AnimatedPressable
              style={styles.backdrop}
              entering={FadeIn}
              exiting={FadeOut}
              onPress={toggleSheet}
            />
          <Animated.View
           style={styles.sheet}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >

            <View style={styles.panel}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Đổi ảnh đại diện</Text>
                <Text style={styles.panelSubtitle}>Chọn ảnh đại diện cho bạn trong các cách sau</Text>
              </View>
              <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Chọn ảnh trong máy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.panelButton}
                onPress={toggleSheet}>
                <Text style={styles.panelButtonTitle}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </>
      )}
    </LinearGradient>

  )
}

export default EditProfile