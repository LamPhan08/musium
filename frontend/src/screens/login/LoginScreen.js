import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Keyboard,
    ToastAndroid,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Musium from '../../../assets/images/musiumlogo.svg';
import GoogleSVG from '../../../assets/images/google.svg';
import FacebookSVG from '../../../assets/images/facebook.svg';
import TwitterSVG from '../../../assets/images/twitter.svg';

import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import LinearGradient from 'react-native-linear-gradient';

import logo from '../../../assets/images/logo.png'
import { COLORS } from '../../constants/colors';

// import { Link, useNavigate } from 'react-router-dom'

import { mongoAPI } from '../../axios/axios';

import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/songSlice';

// import com.facebook.FacebookSdk;
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const { width, height } = Dimensions.get('window')

const LoginScreen = ({ navigation }) => {
    // const [facebookLoginInProgress, setFacebookLoginInProgress] = useState(false);

    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });
    const email = inputs.email
    const password = inputs.password
    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch()


    // const navigate = useNavigate();
    // const {dispatch} = useContext(AuthContext);

    GoogleSignin.configure({
        webClientId: '916968479424-8beoiql3s7il2ao2p085vqm4128ecs0c.apps.googleusercontent.com',
        // webClientId: '768264570933-ec9atg4laq8l9vgcjdqq731id97cd72t.apps.googleusercontent.com'
    });

    // useEffect(() => {
    //     // Initialize GoogleSignin
    //     GoogleSignin.configure({
    //       webClientId: '768264570933-ec9atg4laq8l9vgcjdqq731id97cd72t.apps.googleusercontent.com',
    //       offlineAccess: true,
    //     });
    // }, []);

    async function onGoogleButtonPress() {
        // // Check if your device supports Google Play
        // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // // Get the users ID token
        // const { idToken } = await GoogleSignin.signIn();

        // // Create a Google credential with the token
        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // // Sign-in the user with the credential
        // const userCredential = await auth().signInWithCredential(googleCredential);

        // // Extract user information
        // const user = userCredential.user;
        // console.log(user);

        // const loginResponse = await mongoAPI.post(`/auth/login`,
        //     {
        //         email: user.email,
        //         password: '123456'
        //     }
        // );
        // console.log("Login Response:", loginResponse.data);
        // const userData = loginResponse.data;
        // await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // dispatch(setUser(userData.data))

        // // Sign-in the user with the credential
        // return auth().signInWithCredential(googleCredential);
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


    const handleClick = async () => {
        const loginResponse = await mongoAPI.post(`/auth/login`,
            {
                email,
                password
            }
        );

        if (loginResponse.data === 'Incorrect email or password') {
            ToastAndroid.show('Tài khoản hoặc mật khẩu không đúng!', ToastAndroid.BOTTOM)
        }
        else if (loginResponse.data === 'User not found') {
            ToastAndroid.show('Tài khoản hoặc mật khẩu không hợp lệ!', ToastAndroid.BOTTOM)
        }
        else {
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

        if (!inputs.password) {
            handleError('Bạn phải điền mật khẩu ', 'password');
            isValid = false;
        } else if (inputs.password.length < 6) {
            handleError('Mật khẩu phải từ 6 ký tự trở lên', 'password');
            isValid = false;
        }

        if (isValid) {
            handleClick();
        }
    };


    return (
        <LinearGradient colors={["#121111", "#040306"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={logo} style={{ height: 300, width: 300 }} />
                    </View>

                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: width * 0.06,
                            fontWeight: '500',
                            color: '#FFFFFF',
                            marginBottom: 40,
                            fontFamily: 'Mulish-Bold'

                        }}>
                        Đăng nhập vào tài khoản
                    </Text>

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
                        fieldButtonLabel={"Quên?"}
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        error={errors.password}

                    />

                    <CustomButton label={"Đăng nhập"} onPress={validate} />

                    <Text style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: 30, fontFamily: 'Mulish-Regular' }}>
                        Hoặc tiếp tục với
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 30,
                            gap: 20
                        }}>
                        <TouchableOpacity
                            onPress={
                                () => onGoogleButtonPress()
                                    .then(() => {
                                        console.log('Signed in with Google!');
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
                            onPress={() => {
                                onFacebookButtonPress()
                                    .then(() => { })
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
                        <Text style={{ fontFamily: 'Mulish-Regular', color: COLORS.text }}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: '#06A0B5', fontFamily: 'Mulish-ExtraBold' }}> Đăng ký ngay!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;