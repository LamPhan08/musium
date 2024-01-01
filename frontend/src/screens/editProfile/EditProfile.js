import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from './editProfile.style'
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut } from "react-native-reanimated";
import ImagePicker from 'react-native-image-crop-picker'
import { useSelector, useDispatch } from 'react-redux';
import { mongoAPI } from '../../axios/axios';
import { setUser } from '../../redux/songSlice';
import { COLORS } from '../../constants/colors';


const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const cloud_name = 'db3qu4bzj';
const cloud_preset = 'musium'

const EditProfile = ({ navigation }) => {
  const { user } = useSelector(state => state.song);
  const [img, setImg] = useState(user.photo)
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    // password: '',
    photo: user.photo
  })

  const dispatch = useDispatch()

  const handleInputChange = (text, fieldName) => {
    // Create a new object by spreading the existing formData
    // and updating only the specified field
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: text,
    }));
  };



  const handleSubmit = async e => {
    const updateRespone = await mongoAPI.put(`/user/updateprofile/${user._id}`,
      {
        username: formData.username,
        photo: formData.photo
      }
    )

    dispatch(setUser({
      ...user,
      photo: formData.photo,
      username: formData.username,
    }))
    // console.log("name", formData.username)
    // console.log("photo", formData.photo)
    console.log("Update Response:", updateRespone.data);
    // const userData = updateRespone.data;

    // // Store user data in AsyncStorage
    // await AsyncStorage.setItem('userData', JSON.stringify(userData));
    setImg(formData.photo)

    ToastAndroid.show('Cập nhật thành công!', ToastAndroid.BOTTOM)
    // dispatch(setUser(userData))
    navigation.goBack()
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then(async image => {
      console.log('image', image);
      const uri = image.path
      const type = image.mime
      const name = `test.${image.path.split(".")[1]}`
      const source = { uri, type, name }
      await onUpload(source)
      // setFormData({ ...formData, photo: img })
      toggleSheet()
    });
  }

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: false,
      compressImageQuality: 0.7
    }).then(async image => {
      console.log('image', image);
      const uri = image.path
      const type = image.mime
      const name = `test.${image.path.split(".")[1]}`
      const source = { uri, type, name }
      await onUpload(source)
      // setFormData({ ...formData, photo: img })
      toggleSheet()
    });
  }

  const toggleSheet = () => {
    setOpen(!isOpen);
  };

  const onUpload = async (element) => {

    // if (element.type === "image/jpeg" || element.type === "image/png") {
    try {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", "musium");
      data.append("cloud_name", "db3qu4bzj");
      fetch(`https://api.cloudinary.com/v1_1/db3qu4bzj/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, photo: data.url.toString() })
          
        }) //setImg(data.url.toString()));
    } catch (error) {
      console.log(error)
    }

    // } else {

    //   console.error("Please select an image in jpeg or png format");
    // }
  };

  useEffect(() => {

    const getUser = async () => {
      try {

        const getDataRespone = await mongoAPI.get(`/user/getuser/${user._id}`)
        setFormData({ ...getDataRespone.data })

      } catch (error) {
        console.error(error.message)
      }
    };

    getUser();
  }, []);

console.log('formData.username:', formData.username)
console.log('user.username:', user.username)
  return (
    <LinearGradient colors={["#040306", "#040306"]} style={{ flex: 1 }}  >

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-left' style={styles.headerIcon} />
        </TouchableOpacity>

        <Text style={styles.headerLabel}>Chỉnh sửa hồ sơ</Text>

        <TouchableOpacity
          disabled={(formData.username.trim() === '' || formData.username.trim() === user.username && formData.photo === img) && formData.photo === img ? true : false}
          style={styles.editBtn}
          onPress={handleSubmit}>
          <Text style={[
            styles.editBtnText,
            {
              color: (formData.username.trim() === user.username || formData.username.trim() === '' && formData.photo === img)  && formData.photo === img
                ? 'rgba(0, 194, 203, 0.2)'
                : COLORS.primary
            }
          ]}>
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
              // source={img}
              source={{
                uri: formData.photo,
              }}
            />

            <Feather name='edit-2' style={styles.editIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user" color={COLORS.white} size={25} />
        <TextInput
          placeholder="Nhập tên của bạn"
          placeholderTextColor={COLORS.grey}
          autoCorrect={false}
          style={styles.textInput}
          cursorColor={COLORS.primary}
          value={formData.username}
          onChangeText={(text) => handleInputChange(text, 'username')}
        />
      </View>

      {/* <View style={styles.action}>
        <FontAwesome name="lock" color="#666666" size={20} />
        <TextInput
          secureTextEntry={true}
          placeholder="Mật khẩu"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={formData.password}
          onChangeText={(text) => handleInputChange(text, 'password')}
        />
      </View> */}

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
                <Text style={styles.panelSubtitle}>Hãy chọn một trong hai cách sau</Text>
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
