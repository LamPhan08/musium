import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
} from 'react-native';



import InputField from '../../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Musium from '../../../assets/images/musiumlogo.svg';
import GoogleSVG from '../../../assets/images/google.svg';
import FacebookSVG from '../../../assets/images/facebook.svg';
import TwitterSVG from '../../../assets/images/twitter.svg';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors';

import { AuthContext } from './../../context/AuthContext.js';
import { BASE_URL } from './../../utils/config.js';

// import axios from 'axios';
import { mongoAPI } from '../../axios/axios';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/songSlice';


import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window')

const RegisterScreen = ({ navigation }) => {

  const { user } = useSelector(state => state.song)

  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
  });

  const username = inputs.fullname
  const email = inputs.email
  const password = inputs.password

  const dispatch = useDispatch()

  // const {dispatch} = useContext(AuthContext);

  const [errors, setErrors] = React.useState({});

  GoogleSignin.configure({
    webClientId: '916968479424-8beoiql3s7il2ao2p085vqm4128ecs0c.apps.googleusercontent.com',
    // webClientId: '768264570933-ec9atg4laq8l9vgcjdqq731id97cd72t.apps.googleusercontent.com'
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
      console.log(user);

      const registerResponse = await mongoAPI.post('auth/register', {
        username: user.displayName,
        photo: user.photoURL,
        email: user.email,
        password: '123456',
      })

      console.log('registerResponse.data:', registerResponse.data)

      // Check if the user exists in MongoDB
      const loginResponse = await mongoAPI.post(`/auth/login`, {
        email: user.email,
        password: '123456', // Provide a default password or handle it differently
      });

      console.log("Login Response:", loginResponse.data);
      const userData = loginResponse.data;

      if (userData.success) {
        // User exists, log them in
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        dispatch(setUser(userData.data));
        navigation.replace('App');
      } else {
        // User doesn't exist, proceed with social media sign-in
        // ... (your existing code for storing user data in MongoDB)
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  async function onFacebookButtonPress() {
    try {
      const result = await LoginManager.logInWithPermissions(['email']);

      if (result.isCancelled) {
        console.log("Clicked cancel");
      } else {
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await auth().signInWithCredential(facebookCredential);
        const user = userCredential.user;
        console.log(user);

        const registerResponse = await mongoAPI.post('auth/register', {
          username: user.displayName,
          photo: user.photoURL,
          email: user.email,
          password: '123456',
        })

        console.log('registerResponse.data:', registerResponse.data)

        // Check if the user exists in MongoDB
        const loginResponse = await mongoAPI.post(`/auth/login`, {
          email: user.email,
          password: '123456', // Provide a default password or handle it differently
        });

        console.log("Login Response:", loginResponse.data);
        const userData = loginResponse.data;

        if (userData.success) {
          // User exists, log them in
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          dispatch(setUser(userData.data));
          navigation.replace('App');
        } else {
          // User doesn't exist, proceed with social media sign-in
          // ... (your existing code for storing user data in MongoDB)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Vui lòng điền email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Vui lòng điền email hợp lệ', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Vui lòng điền tên của bạn', 'fullname');
      isValid = false;
    }


    if (!inputs.password) {
      handleError('Bạn phải điền mật khẩu ', 'password');
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError('Mật khẩu phải từ 6 ký tự trở lên', 'password');
      isValid = false;
    }

    if (inputs.password !== inputs.confirmPassword) {
      handleError('Xác nhận mật khẩu không chính xác', 'confirmPassword');
      isValid = false;
    }

    if (isValid) {
      handleClick();
    }
  };


  const handleClick = async e => {
    // e.preventDefault();
    const registerResponse = await mongoAPI.post(`/auth/register`,
      {
        username,
        email,
        password,
        photo: 'https://res.cloudinary.com/db3qu4bzj/image/upload/v1704011566/avatar_hqflo5.png'
      }
    );


    if (registerResponse.data === 'User already exists') {
      ToastAndroid.show('Email đã tồn tại!', ToastAndroid.BOTTOM)
    }
    else {
      const loginResponse = await mongoAPI.post(`/auth/login`,
        {
          email,
          password
        }
      );
      console.log("Login Response:", loginResponse.data);
      const userData = loginResponse.data;
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      dispatch(setUser(userData.data))

      navigation.replace('App')
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <LinearGradient colors={["#121111", "#040306"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={logo} style={{ height: 250, width: 250 }} />
          </View>

          <Text
            style={{
              textAlign: 'center',
              fontSize: width * 0.06,
              fontWeight: '500',
              color: '#FFFFFF',
              marginBottom: 30,
              fontFamily: 'Mulish-Bold'
            }}>
            Đăng ký tài khoản
          </Text>


          {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View> */}

          {/* <Text style={{textAlign: 'center', color: '#FFFFFF', marginBottom: 30, fontSize: 16,}}>
          Or, register with email ...
        </Text> */}

          <InputField
            label={'Tên người dùng'}
            icon={
              <Ionicons
                name="person"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            error={errors.fullname}
          />

          <InputField
            label={'Email'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            error={errors.email}
          />

          <InputField
            label={'Mật khẩu'}
            icon={
              <Ionicons
                name="lock-closed"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            error={errors.password}
          />

          <InputField
            label={'Xác nhận mật khẩu'}
            icon={
              <Ionicons
                name="lock-closed"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            onChangeText={text => handleOnchange(text, 'confirmPassword')}
            onFocus={() => handleError(null, 'confirmPassword')}
            error={errors.confirmPassword}
          />


          <CustomButton label={'Tạo tài khoản'} onPress={
            // () => {}
            validate
          } />

          <Text style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: 30, fontFamily: 'Mulish-Regular' }}>
            Hoặc tiếp tục với
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 30,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              // onPress={() => { }}
              onPress={
                () => onGoogleButtonPress()
                  .then(() => {
                    console.log('Signed up with Google!');
                  }
                  )
                  .catch((error) => {
                    console.log(error.message);
                  })
                // signInWithGoogle
              }
              style={{
                borderColor: '#ddd',
                borderWidth: 0.5,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => { }}
              onPress={() =>
              // onFacebookButtonPress().
              // then(() => 
              //     {
              //         console.log('Signed in with Facebook!');
              //         navigation.navigate('App')
              //     })
              // .catch(() => console.log("Sign in with facebook failed"))
              {
                onFacebookButtonPress()
                  .then(() => {
                  })
                  .catch(() => console.log('Sign in with Facebook failed'))
              }
              }
              style={{
                borderColor: '#ddd',
                borderWidth: 0.5,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <FacebookSVG height={24} width={24} />
            </TouchableOpacity>
            {/* <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <TwitterSVG height={24} width={24} />
                    </TouchableOpacity> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text style={{ fontFamily: 'Mulish-Regular', color: COLORS.text }}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: '#06A0B5', fontFamily: 'Mulish-Bold' }}> Đăng nhập ngay!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;